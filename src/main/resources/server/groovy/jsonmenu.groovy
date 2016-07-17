import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import org.slf4j.LoggerFactory


import java.nio.file.Paths

def log = LoggerFactory.getLogger('groovy-scripts.jsonmenu')

response.contentType = 'application/javascript'

JsonSlurper jsonSlurper = new JsonSlurper()
log.debug 'path:'+ new File('.').absolutePath

//def json = jsonSlurper.parse(Paths.get(getClass().getResource('/').toURI()).resolveSibling('../resources/main/server/static/js/testmenu.json') .toFile())

//print JsonOutput.toJson(json)