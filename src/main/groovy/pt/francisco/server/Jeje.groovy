package pt.francisco.server

import groovy.servlet.GroovyServlet
import groovy.servlet.TemplateServlet
import org.mortbay.jetty.Server
import org.mortbay.jetty.servlet.Context
import org.mortbay.jetty.servlet.DefaultServlet
import org.mortbay.servlet.MultiPartFilter

import java.nio.file.Paths

new Server(9090).with {
    new Context(it, '/', Context.SESSIONS).with {
        Properties properties = Paths.getResource('/config.properties').withReader {
            Properties propertiesTemp = new Properties()
            propertiesTemp.load(it)
            return propertiesTemp
        }
        resourceBase = properties.get('serverResources')

        print getResource('/static/index.html').file.absolutePath

        addFilter MultiPartFilter, '/*', DEFAULT
        addServlet(DefaultServlet, '/static/*').with {
            setInitParameter 'dirAllowed', 'true'
        }
        addServlet(TemplateServlet, '/view/*').with {
            setInitParameter 'resource.name.regex', '/view(.*)'
            setInitParameter 'resource.name.replacement', 'gsp/$1.gsp'
        }
        addServlet(GroovyServlet, '/groovy/*').with {
            setInitParameter 'resource.name.regex', '/groovy(.*)'
            setInitParameter 'resource.name.replacement', 'groovy/$1.groovy'
        }
    }

    start()
    join()
}