import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.slf4j.LoggerFactory
import pt.francisco.util.TestClass

def log = LoggerFactory.getLogger('groovy-scripts.recieve')

response.contentType = 'application/javascript'

JsonSlurper jsonSlurper = new JsonSlurper()

log.debug new File('.').listFiles().collect {it.name}.join(', ')

def json = jsonSlurper.parse(request.reader)

new TestClass().execute()

print JsonOutput.toJson(json)