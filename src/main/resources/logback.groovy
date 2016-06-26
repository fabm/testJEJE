import ch.qos.logback.classic.encoder.PatternLayoutEncoder
import ch.qos.logback.core.FileAppender

def byDay = timestamp("yyyyMMdd")

appender("FILE", FileAppender) {
    file = "log-${byDay}.txt"
    encoder(PatternLayoutEncoder) {
        pattern = "%logger{35} - %msg%n"
    }
}

logger("groovy-scripts", DEBUG, ["FILE"])
logger("pt.francisco.util", DEBUG, ["FILE"])

root(INFO, ["FILE"])