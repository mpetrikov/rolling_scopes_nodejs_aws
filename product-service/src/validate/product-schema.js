import Joi from 'joi';

export const productSchema = Joi.object().keys({
    title: Joi.string().required().error(new Error('A title should be provided')),
    image: Joi.string().required().error(new Error('A image link should be provided')),
    description: Joi.string(),
    price: Joi.number().min(1).required().error(new Error('A price should be provided')),
    count: Joi.number().min(0).required().error(new Error('A count should be provided')),
  });
  
  