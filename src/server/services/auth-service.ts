import * as jwt from 'jsonwebtoken';
import { JWT_SIGNING_SECRET } from '../config';
import { AuthChecker } from 'type-graphql';
import Container from 'typedi';
import { HeroResolver } from '../resolvers/hero-resolver';
import { AuthenticationContext, ParsedToken } from '../types/auth';

const generateJwtForUserId = (userId: string) => jwt.sign({ userId }, JWT_SIGNING_SECRET);

const getContentFromToken = (token: string): ParsedToken => jwt.verify(token, JWT_SIGNING_SECRET) as any;

const customAuthChecker: AuthChecker<AuthenticationContext> = async ({ context: { req } }, roles) => {
	const token = req.headers.authorization;

	// If authorization token is missing
	if (!token) return false;

	const { userId } = getContentFromToken(token);

	if (!userId) return false;

	const serviceInstance = Container.get(HeroResolver);

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
