const mongoose = require('mongoose');

const WFH_Survey_Schema = mongoose.Schema(
  {
    WFH_Value: {
      type: Number,
      require: true,
    },
    WFH_Team_Belong: {
      type: String,
      require: true,
    },
    WFH_TM_Feedback: {
      type: String,
      require: true,
    },
    WFH_Mood_Driven: {
      type: String,
      require: true,
    },
    // WFH_TM_Recognize: {
    //   type: String,
    //   require: true,
    // },
    WFH_Challenges: {
      type: String,
      require: true,
      trim: true,
    },
    WFH_Work_Best: {
      type: String,
      require: true,
      trim: true,
    },
    WFH_Mood: {
      type: String,
      require: true,
    },
    WFH_Team_Manager: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const SurveyData = mongoose.model('Work_From_Home_Data', WFH_Survey_Schema);
module.exports = SurveyData;
