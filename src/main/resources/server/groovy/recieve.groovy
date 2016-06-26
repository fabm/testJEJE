import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.slf4j.LoggerFactory
import pt.francisco.util.TestClass

def log = LoggerFactory.getLogger('groovy-scripts.recieve')

response.contentType = 'application/javascript'

JsonSlurper jsonSlurper = new JsonSlurper()

File myFile

log.debug 'file->\n  ' +
        ''+(myFile?.listFiles()?.collect {it.name} ?.join(', \n  ') ?: '  (null)')

myFile = new File('.')
log.debug 'file->\n  ' +
        ''+(myFile?.listFiles()?.collect {it.name} ?.join(', \n  ') ?: '  (null)')

def json = jsonSlurper.parse(request.reader)

new TestClass().execute()

print JsonOutput.toJson(json)