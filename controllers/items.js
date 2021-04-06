const db = require('../db/tracks');

 
exports.getTracks = async (req, res, next) => {
  try { 
    const tracks = await db.getAllTracks()
    res.status(200).json({   
      message: "Fetched tracks successfully.",
      tracks: tracks,   
    });
  } catch (err) { 
    if (!err.statusCode) {
      err.statusCode = 500; 
    } 
    next(err); 
  }
};  
