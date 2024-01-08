import mcs from '../strategies/memberCourseStrategies.js'
import cms from '../strategies/campaignMemberStrategies.js'
import gms from '../strategies/groupMemberStrategies.js'

const pipeline = [mcs.quiz.create, cms.quiz.create, gms.create]
const errorPipeline = [mcs.quiz.undoCreate, cms.quiz.undoCreate, gms.undoCreate]
const failurePipeline = [() => Promise.resolve()]

const campaignOnQuizPipelines = {
  pipeline,
  errorPipeline,
  failurePipeline,
}

export default campaignOnQuizPipelines
