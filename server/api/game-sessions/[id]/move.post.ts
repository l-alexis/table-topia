export default defineEventHandler(async (event) => {
  const id = event.context.params?.id;
  const body = await readBody(event);
  const { position } = body;

  // TODO: Mettre à jour la position dans la base de données
  
  return {
    success: true,
    newPosition: position
  };
});
