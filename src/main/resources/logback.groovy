import ch.qos.logback.classic.encoder.PatternLayoutEncoder
import ch.qos.logback.core.FileAppender

def byDay = timestamp("yyyyMMdd")

appender("FILE", FileAppender) {
    file = "log-${byDay}.txt"
    encoder(PatternLayoutEncoder) {
        pattern = "%logger{35} - %msg%n"
    }
}

appender("FILE-DEBUG", FileAppender) {
    file = "log-debug-${byDay}.txt"
    encoder(PatternLayoutEncoder) {
        pattern = "%msg%n"
    }
}

logger("groovy-scripts", DEBUG, ["FILE-DEBUG"])
logger("pt.francisco.util", DEBUG, ["FILE-DEBUG"])

root(INFO, ["FILE"])