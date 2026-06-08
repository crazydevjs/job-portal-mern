const Application = require("../models/Application");

const applyJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const existing = await Application.findOne({
      candidate: req.user.id,
      job: jobId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Already applied",
      });
    }

    const application = await Application.create({
      candidate: req.user.id,
      job: jobId,
    });

    res.status(201).json({
      success: true,
      application,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  applyJob,
};