import { Container } from "typedi";
import { TagsService } from "./services/tags.service";
import { TodosService } from "./services/todos.service";

// Register services
Container.set(TagsService, new TagsService());
Container.set(TodosService, new TodosService(Container.get(TagsService)));

export { Container }; 