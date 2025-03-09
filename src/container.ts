import { Container } from "typedi";
import { TodosService } from "./services/todos.service";
import { TagsService } from "./services/tags.service";

// Register services
Container.set(TodosService, new TodosService(Container.get(TagsService)));
Container.set(TagsService, new TagsService());

export { Container };
