import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;
}

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  completed: boolean;

  @Field(() => [Tag])
  tags: Tag[];

  // Internal field (not exposed in GraphQL)
  tagIds: string[];
} 