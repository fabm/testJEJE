import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.slf4j.LoggerFactory
import pt.francisco.util.TestClass

def log = LoggerFactory.getLogger('groovy-scripts.updatemenu')

response.contentType = 'application/javascript'

JsonSlurper jsonSlurper = new JsonSlurper()

def json = jsonSlurper.parse(request.reader)

new TestClass().execute()

print JsonOutput.toJson(json)