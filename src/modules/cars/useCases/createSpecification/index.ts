import SpecificationRepository from '../../repositories/implementations/SpecificationsRepository';
import CreateSpecifictionUseCase from './CreateSpecificationUseCase';
import CreateSpecificationController from './CreateSpecificationController';

const specificationRepository = SpecificationRepository.getInstance();
const createSpecifictionUseCase = new CreateSpecifictionUseCase(specificationRepository);
const createSpecificationController = new CreateSpecificationController(createSpecifictionUseCase);

export default createSpecificationController;