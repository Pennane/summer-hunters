import { Resolver, Query, ObjectType, Field, Arg } from 'type-graphql';
import { Service } from 'typedi';
import { AuthService } from '../services/auth-service';
import { HeroResolver } from './hero-resolver';

@ObjectType()
class AuthToken {
	@Field()
	jwt: string;
}

@Service()
@Resolver((of) => AuthToken)
export class AuthTokenResolver {
	constructor(private readonly heroResolver: HeroResolver) {}

	@Query((returns) => AuthToken)
	async authenticate(@Arg('userId') userId: string): Promise<AuthToken> {
		const hero = await this.heroResolver.getById(userId);
		const jwt = await AuthService().generateJwtForHero(hero);
		return { jwt };
	}
}
