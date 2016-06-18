import groovy.json.JsonOutput
import groovy.json.JsonSlurper

response.contentType = 'application/javascript'

JsonSlurper jsonSlurper = new JsonSlurper()

def json = jsonSlurper.parse(request.reader)

print JsonOutput.toJson(json)