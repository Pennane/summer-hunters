// It is your job to implement this. More info in README

import styled from 'styled-components';

import * as React from 'react';

interface HeroAttributes {
	strength: number;
	intelligence: number;
	stamina: number;
	healthpoints: number;
	mana: number;
	agility: number;
	speed: number;
	resistance: string;
	weakness: string;
	__typename: 'Attribute' | undefined;
}

interface HeroSkill {
	name: string;
	damage: number;
	element: string;
	__typename: 'Skill' | undefined;
}

interface IProps {
	name: string;
	imgUrl: string;
	description: string;
	backStory: string;
	attributes: HeroAttributes;
	skills: HeroSkill[];
}

const Wrapper = styled.div`
	font-family: 'Montserrat';
	scroll-snap-align: center;
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 10px;
	max-width: 560px;
	justify-self: center;
	border-radius: 6px;
	background-color: #fff;
	box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06), inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

const Header = styled.div`
	flex: 0 0 auto;
`;

const HeaderImage = styled.img`
	width: 100%;
	height: 315px;
	border-radius: 5px 5px 0 0;
	object-fit: cover;
	@media (max-width: 900px) {
		height: 240px;
	}
	@media (max-width: 700px) {
		height: 190px;
		margin-bottom: 0.4rem;
		object-position: 30% 60%;
	}
`;

const Body = styled.div`
	padding: 0 1.6em;
	flex: 1 0 auto;
	display: flex;
	flex-direction: column;
`;

const HeroH2 = styled.h2`
	font-size: 3em;
  padding: 0 1.6rem;
  
	@media (max-width: 700px) {
		margin-top: 0.5rem;
    margin-bottom 0.8rem;
		font-size: 2.2em;

	}
`;

const Description = styled.p`
	text-align: justify;
	color: #1a0f4b;
	line-height: 1.7;
	min-height: 130px;
	@media (max-width: 600px) {
		min-height: 200px;
	}
`;

const Backstory = styled.p`
	color: #341158;
	line-height: 2;
	margin-top: 1.5rem;
	font-size: 0.98em;
	margin-bottom: 2.5rem;
`;

const HeroSkills = styled.div``;

const Skills = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const Skill = styled.div`
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	background: linear-gradient(45deg, #e637a4, #c7281b);
	color: white;
	padding: 0.5em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	margin: 4px;

	width: 150px;
	height: 150px;
	box-sizing: border-box;
	text-align: center;
	@media (max-width: 700px) {
		font-size: 0.92em;
		width: 120px;
		height: 125px;
	}
`;

const SkillHeader = styled.h4`
	margin: 0;
	margin-bottom: 0.4rem;
	margin-top: 0.3rem;
`;

const Attributes = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
`;

const Attribute = styled.div`
	padding: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 60px;
	height: 60px;
	margin: 5px;
	background: linear-gradient(91deg, #1e1357, #1b104e);
	color: white;
	border-radius: 999px;
	box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%);
	@media (max-width: 700px) {
		font-size: 0.79em;
		width: 47px;
		height: 47px;
	}
`;

const AttributeKey = styled.i`
	color: #5a9bfe;
	height: 16px;
	margin-bottom: 2px;
`;
const AttributeValue = styled.span``;

const AttributeIndex = ({ name, value, icon }) => (
	<Attribute title={name}>
		<AttributeKey className={icon} />
		<AttributeValue>{value}</AttributeValue>
	</Attribute>
);

const AttributesIndex = ({ heroAttributes }) => (
	<div>
		<h3>Attributes</h3>
		<Attributes>
			<AttributeIndex icon="fas fa-hand-rock" name="strength" value={heroAttributes.strength} />
			<AttributeIndex icon="fas fa-book" name="intelligence" value={heroAttributes.intelligence} />
			<AttributeIndex icon="fas fa-bolt" name="stamina" value={heroAttributes.stamina} />
			<AttributeIndex icon="fas fa-heart" name="healthpoints" value={heroAttributes.healthpoints} />
			<AttributeIndex icon="fas fa-star" name="mana" value={heroAttributes.mana} />
			<AttributeIndex icon="fas fa-frog" name="agility" value={heroAttributes.agility} />
			<AttributeIndex icon="fas fa-tachometer-alt" name="speed" value={heroAttributes.speed} />
			<AttributeIndex icon="fas fa-shield-alt" name="resistance" value={heroAttributes.resistance} />
			<AttributeIndex icon="fas fa-heart-broken" name="weakness" value={heroAttributes.weakness} />
		</Attributes>
	</div>
);

const SkillsIndex = ({ skills }: { skills: HeroSkill[] }) => {
	return (
		<div>
			<h3>Skills</h3>
			<Skills>
				{skills &&
					skills.map((skill, i) => (
						<Skill key={name + '-skill-' + i}>
							<SkillHeader>{skill.name}</SkillHeader>
							<div>
								{skill.damage}
								<i className="fas fa-certificate"></i>
							</div>
							<p>{skill.element}</p>
						</Skill>
					))}
			</Skills>
		</div>
	);
};

export const HeroCard: React.FC<IProps> = ({ name, imgUrl, description, backStory, attributes: heroAttributes, skills }) => {
	return (
		<Wrapper>
			<Header>
				<HeaderImage width="400" src={imgUrl} />

				<HeroH2>{name}</HeroH2>
			</Header>
			<Body className="body">
				<Description>{description}</Description>
				<HeroSkills>
					<AttributesIndex heroAttributes={heroAttributes} />
					<SkillsIndex skills={skills} />
				</HeroSkills>

				<Backstory>{backStory}</Backstory>
			</Body>
		</Wrapper>
	);
};
