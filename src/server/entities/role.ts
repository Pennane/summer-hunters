import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, Unique } from 'typeorm';
import { ObjectType, ID, Field } from 'type-graphql';
import { TRole } from '../types/role';
import { Lazy } from '../helpers';
import { Hero } from './hero';

@Entity()
@ObjectType()
@Unique(['id', 'name'])
export class Role {
	@Field((type) => ID)
	@PrimaryGeneratedColumn()
	id!: number;

	@ManyToMany((type) => Hero, { lazy: true })
	heroes: Lazy<Hero[]>;

	@Field()
	@Column()
	name: TRole;
}
