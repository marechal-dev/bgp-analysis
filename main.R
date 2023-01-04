library("rjson")
library("ggplot2")

Sys.setlocale("LC_TIME", "C")

data = fromJSON(file = "./output.json")

dataFrame = as.data.frame(data)

sizeForDayDataFrame = data.frame(
  date = as.POSIXct(data$date, origin = data$date[[1]]),
  pathSize = data$pathSize
)

ggplot(sizeForDayDataFrame, aes(x = date, y = pathSize)) +
  geom_line() + 
  ggtitle("Path Size over time", subtitle = NULL) +
  xlab("Time") + 
  ylab("Path Size") + 
  scale_x_datetime(date_breaks = "5 days", date_labels = "%H:%M:%S\n%d %m %Y")

ggsave(filename = "test.png", units = "in", width = 28, height = 12, dpi = 300)
