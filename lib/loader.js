const fastGlob = require('fast-glob');
const loadJsonFile = require('load-json-file');

const loadFiles = async files => {
  return await Promise.all(files.map(async file => {
    let schema = await loadJsonFile(file)
      .catch(e => {
        console.error(e);
      });
    return {
      filename: file,
      // @todo this should be called something generic as it
      // is not always a schema
      schema: schema
    };
  }));
}

var Loader = function(){}

Loader.loadJsonFiles = async function(glob) {
  const files = fastGlob.sync(glob);
  const results = await loadFiles(files);
  console.log('Loaded', results.length, 'json schema files.');
  return results.filter(result => result.schema !== undefined);
};

module.exports = Loader;