import { ResolverData } from 'type-graphql';

export type AuthCheckerInterface<TContextType = {}, TRoleType = string> = {
	check(resolverData: ResolverData<TContextType>, roles: TRoleType[]): boolean | Promise<boolean>;
};
