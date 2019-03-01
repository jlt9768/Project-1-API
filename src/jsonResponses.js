
const users = {};


const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(status, headers);
  response.end();
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
  return respondJSON(request, response, 200, responseJSON);
};
const getNotReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};

const getUsersMeta = (request, response) => respondJSONMeta(request, response, 200);

const getNotRealMeta = (request, response) => respondJSONMeta(request, response, 404);


const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required.',
  };

  if (!body.name) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code to 201 created
  let responseCode = 201;


  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  // add or update fields for this user name
  users[body.name].name = body.name;
  // users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};
//
// // Update all weight lifting values
// const updateWL = (request, response, body) => {
//  const responseJSON = {
//    message: 'Name is required.',
//  };
//
//  if (!body.name) {
//    responseJSON.id = 'missingParams';
//    return respondJSON(request, response, 400, responseJSON);
//  }
//
//  // default status code to 201 created
//  let responseCode = 201;
//
//
//  if (users[body.name]) {
//    responseCode = 204;
//  } else {
//    users[body.name] = {};
//  }
//
//  // add or update fields for this user name
//  users[body.name].name = body.name;
//  if (body.chestPress) {
//    users[body.name].chestPress = body.chestPress;
//  }
//  if (body.bicepCurl) {
//    users[body.name].bicepCurl = body.bicepCurl;
//  }
//  if (body.tricepCurl) {
//    users[body.name].tricepCurl = body.tricepCurl;
//  }
//
//  if (body.shoulderPress) {
//    users[body.name].shoulderPress = body.shoulderPress;
//  }
//  if (body.legPress) {
//    users[body.name].legPress = body.legPress;
//  }
//
//  if (responseCode === 201) {
//    responseJSON.message = 'Created Successfully';
//    return respondJSON(request, response, responseCode, responseJSON);
//  }
//
//  return respondJSONMeta(request, response, responseCode);
// };
//
// // Update all Body weight values
// const updateBW = (request, response, body) => {
//  const responseJSON = {
//    message: 'Name is required.',
//  };
//
//  if (!body.name) {
//    responseJSON.id = 'missingParams';
//    return respondJSON(request, response, 400, responseJSON);
//  }
//
//  // default status code to 201 created
//  let responseCode = 201;
//
//
//  if (users[body.name]) {
//    responseCode = 204;
//  } else {
//    users[body.name] = {};
//  }
//
//  // add or update fields for this user name
//  users[body.name].name = body.name;
//  if (body.pushUps) {
//    users[body.name].pushUps = body.pushUps;
//  }
//  if (body.sitUps) {
//    users[body.name].sitUps = body.sitUps;
//  }
//  if (body.pullUps) {
//    users[body.name].pullUps = body.pullUps;
//  }
//
//  if (body.burpees) {
//    users[body.name].burpees = body.burpees;
//  }
//
//  if (responseCode === 201) {
//    responseJSON.message = 'Created Successfully';
//    return respondJSON(request, response, responseCode, responseJSON);
//  }
//
//  return respondJSONMeta(request, response, responseCode);
// };
//
// const updateCardio = (request, response, body) => {
//  const responseJSON = {
//    message: 'Name is required.',
//  };
//
//  if (!body.name) {
//    responseJSON.id = 'missingParams';
//    return respondJSON(request, response, 400, responseJSON);
//  }
//
//  // default status code to 201 created
//  let responseCode = 201;
//
//
//  if (users[body.name]) {
//    responseCode = 204;
//  } else {
//    users[body.name] = {};
//  }
//
//  // add or update fields for this user name
//  users[body.name].name = body.name;
//  if (body.mile) {
//    users[body.name].mile = body.mile;
//  }
//
//  if (responseCode === 201) {
//    responseJSON.message = 'Created Successfully';
//    return respondJSON(request, response, responseCode, responseJSON);
//  }
//
//  return respondJSONMeta(request, response, responseCode);
// };
//
const updateAll = (request, response, body) => {
  const responseJSON = {
    message: 'Name is required.',
  };

  if (!body.name) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // default status code to 201 created
  let responseCode = 201;


  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  // add or update fields for this user name
  users[body.name].name = body.name;
  if (body.chestPress) {
    users[body.name].chestPress = body.chestPress;
  }
  if (body.bicepCurl) {
    users[body.name].bicepCurl = body.bicepCurl;
  }
  if (body.tricepCurl) {
    users[body.name].tricepCurl = body.tricepCurl;
  }
  if (body.shoulderPress) {
    users[body.name].shoulderPress = body.shoulderPress;
  }
  if (body.legPress) {
    users[body.name].legPress = body.legPress;
  }
  if (body.pushUps) {
    users[body.name].pushUps = body.pushUps;
  }
  if (body.sitUps) {
    users[body.name].sitUps = body.sitUps;
  }
  if (body.pullUps) {
    users[body.name].pullUps = body.pullUps;
  }
  if (body.burpees) {
    users[body.name].burpees = body.burpees;
  }
  if (body.mile) {
    users[body.name].mile = body.mile;
  }

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};
// Not found response
const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  return respondJSON(request, response, 404, responseJSON);
};


module.exports = {
  getUsers,
  getUsersMeta,
  getNotReal,
  getNotRealMeta,
  addUser,
  updateAll,
  notFound,
};
