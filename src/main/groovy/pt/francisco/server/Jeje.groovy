package pt.francisco.server

import groovy.servlet.GroovyServlet
import groovy.servlet.TemplateServlet
import org.mortbay.jetty.Server
import org.mortbay.jetty.servlet.Context
import org.mortbay.jetty.servlet.DefaultServlet
import org.mortbay.jetty.servlet.ServletHolder
import org.mortbay.servlet.MultiPartFilter
import org.slf4j.LoggerFactory

import javax.servlet.Servlet
import javax.servlet.ServletException
import javax.servlet.ServletRequest
import javax.servlet.ServletResponse
import javax.servlet.http.HttpServlet
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import java.nio.file.Paths

String accessToken = UUID.randomUUID().toString()

new Server(9090).with {
    new Context(it, '/', Context.SESSIONS).with {
        Properties properties = Paths.getResource('/config.properties').withReader {
            Properties propertiesTemp = new Properties()
            propertiesTemp.load(it)
            return propertiesTemp
        }
        resourceBase = properties.get('serverResources')

        println 'http://localhost:9090/create-token/' + accessToken

        addFilter MultiPartFilter, '/*', DEFAULT

        addServlet new ServletHolder(new HttpServlet(){
            @Override
            void service(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
                res.sendRedirect '/static/generators.html'
            }
        }), '/*'

        addServlet(DefaultServlet, '/static/*').with {
            setInitParameter 'dirAllowed', 'true'
        }
        addServlet(TemplateServlet, '/view/*').with {
            setInitParameter 'resource.name.regex', '/view(.*)'
            setInitParameter 'resource.name.replacement', 'gsp/$1.gsp'
        }
        addServlet(GroovyServlet, '/create-token/*').with {
            setAttribute('accessToken',accessToken)
            setInitParameter 'resource.name.regex', '/create-token/(.*)'
            setInitParameter 'resource.name.replacement', 'create-token.groovy'
        }
        addServlet(GroovyServlet, '/groovy/*').with {
            setInitParameter 'resource.name.regex', '/groovy(.*)'
            setInitParameter 'resource.name.replacement', 'groovy/$1.groovy'
        }
    }

    start()
    join()
}