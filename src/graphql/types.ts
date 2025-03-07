import { Field, ID, InputType, ObjectType } from "type-graphql";

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
}

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  completed: boolean;

  @Field(() => String)
  createdAt: string;

  @Field(() => String)
  updatedAt: string;
} 

@InputType()
export class NewTagInput {
  @Field()
  name: string;
}

@InputType()
export class TagOrId {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field(() => NewTagInput, { nullable: true })
  newTag?: NewTagInput;
}

@InputType()
export class NewTodoInput {
  @Field()
  title: string;

  @Field(() => [TagOrId])
  tags: TagOrId[];
}