import org.slf4j.LoggerFactory

def log = LoggerFactory.getLogger('create-token')
log.debug request.getPathInfo()

html.html{
    head{
        script{
            mkp.yield """\
            |sessionStorage.setItem('accessToken','${request.getPathInfo().substring(1)}');
            |window.location.href='/static/generators.html';""".stripMargin()
        }
    }
}