import * as jwt from 'jsonwebtoken';
import { JWT_SIGNING_SECRET } from '../config';
import { AuthChecker } from 'type-graphql';
import Container from 'typedi';
import { HeroResolver } from '../resolvers/hero-resolver';
import { AuthenticationContext } from '../types/context';

const generateJwtForUserId = (userId: string) => jwt.sign({ userId }, JWT_SIGNING_SECRET);

const customAuthChecker: AuthChecker<AuthenticationContext> = async ({ context: { req } }, roles) => {
	const token = req.headers.authorization;

	const serviceInstance = Container.get(HeroResolver);

	// If authorization token is missing
	if (!token) return false;

	const { userId } = jwt.verify(token, JWT_SIGNING_SECRET) as any;

	if (!userId) return false;

	const hero = await serviceInstance.getById(userId);

	if (!hero) return false;

	// If the hero exists and the query has @Authorized() with no specified roles
	if (roles.length === 0) {
		return true;
	}

	const heroRoles = await hero.roles;

	// If hero has a role included in the @Authorized(string[]), return true
	if (heroRoles.some((role) => roles.includes(role.name))) {
		return true;
	}

	// else unauthorized
	return false;
};

export const AuthService = () => ({
	generateJwtForUserId,
	customAuthChecker,
});
