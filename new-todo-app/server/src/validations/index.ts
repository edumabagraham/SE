import Joi from 'joi';

export const validateAddTodoInput = async (data: any) => {
  const schema = Joi.object({
    title: Joi.string().required(),
  });
  return await schema.validateAsync(data);
};

export const validateUpdateInput = async (data: any) => {
  const schema = Joi.object({
    status: Joi.string().valid('pending', 'completed').required(),
  });
  return await schema.validateAsync(data);
};

export const validateAddSubtaskInput = async (data: any) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    todo_id: Joi.number().required(),
  });

  return await schema.validateAsync(data, { abortEarly: false });
};
