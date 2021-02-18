import * as jwt from 'jsonwebtoken';
import { JWT_SIGNING_SECRET } from '../config';
import { Hero } from '../entities/hero';
import { AuthChecker } from 'type-graphql';
import { AuthenticationContext } from '../types/context';
import { Role } from '../entities/role';

interface StrippedHero {
	id: number;
	name: string;
	roles: Role[];
}

const generateJwtForHero = async ({ id, name, roles }: Hero) => {
	console.log('in sign part', roles);
	const resolvedRoles = await roles;
	return jwt.sign({ id, name, roles: resolvedRoles }, JWT_SIGNING_SECRET);
};

const customAuthChecker: AuthChecker<AuthenticationContext> = ({ context: { req } }, roles) => {
	const token = req.headers.authorization;

	// If authorization token is missing
	if (!token) return false;

	const hero = jwt.verify(token, JWT_SIGNING_SECRET) as StrippedHero;

	// If the token did not include a hero
	if (!hero) return false;

	// If the hero exists and the query has @Authorized()
	if (roles.length === 0) {
		return true;
	}

	// If hero has a role included in the @Authorized(string[])
	if (hero.roles.some((role) => roles.includes(role.name))) {
		return true;
	}

	// Else unauthorized
	return false;
};

export const AuthService = () => ({
	generateJwtForHero,
	customAuthChecker,
});
