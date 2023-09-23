export const startAction = async (title, callback) => {
  console.log(`${title}... ⌛`);
  const data = await callback();
  console.log(`DONE ${title} ✅`);

  return data;
};
