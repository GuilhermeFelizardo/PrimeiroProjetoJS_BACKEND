const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket')

// index, show, store, update, destroy

module.exports = {
  
  async index(request, response){
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;
    const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`)
    const {  name = login, avatar_url, bio} = apiResponse.data;
    
    let dev = await Dev.findOne({ github_username });

    if(!dev){
      const techsArray = parseStringAsArray(techs);

      const location = {
          type: 'Point',
          coordinates: [longitude, latitude],
      };
  
      dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          techs: techsArray,
          location,
      })

      //Filtrar as conexoes que estao ha no max 10km de distancia e que o nove dev tenha pelo menos 1 das techs filtradas

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      )

        sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }
    
    //update e destroy

    return response.json(dev);
  }
};