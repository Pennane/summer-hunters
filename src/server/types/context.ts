import { GraphQLSchema } from 'graphql';
import { HeroResolver } from '../resolvers/hero-resolver';

export interface AuthenticationContext {
	req: any;
	HeroResolver: HeroResolver;
}
