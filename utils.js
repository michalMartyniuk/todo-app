module.exports = updater = (model, id, property, data) => {
  return new Promise((resolve, reject) => {
    model.findByIdAndUpdate( id, { [property]: data }, { new: true }, (err, result) => {
      if(err) reject(err);
      if(!result) reject("User not found");
      resolve(result); 
    })
  })
}


