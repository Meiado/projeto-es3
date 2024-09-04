
import { FastifyError, FastifyRequest, FastifyReply} from 'fastify';
import { ValidationError } from "joi";

export default function handleErrors(error: FastifyError, req: FastifyRequest, res: FastifyReply) {

  if (error instanceof ValidationError ) {
    const formattedErrors = error.details.map((validationError) => ({
      field: validationError.path.join('.'),
      message: validationError.message,
    }));

    const responseData = {
      statusCode: 400,
      message: 'Erro de validação dos dados',
      details: formattedErrors,
    };

    res.code(400).send(responseData);
  }

  res.code(error?.statusCode || 500).send(error);
}