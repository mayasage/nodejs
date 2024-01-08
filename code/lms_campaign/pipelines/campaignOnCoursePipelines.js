import mcs from '../strategies/memberCourseStrategies.js'
import cms from '../strategies/campaignMemberStrategies.js'
import gms from '../strategies/groupMemberStrategies.js'

const pipeline = [mcs.course.create, cms.course.create, gms.create]

const errorPipeline = [
  mcs.course.undoCreate,
  cms.course.undoCreate,
  gms.undoCreate,
]

const failurePipeline = [() => Promise.resolve()]

const campaignOnCoursePipelines = {
  pipeline,
  errorPipeline,
  failurePipeline,
}

export default campaignOnCoursePipelines
