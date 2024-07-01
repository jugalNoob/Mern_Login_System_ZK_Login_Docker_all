const statusMonitor = require('express-status-monitor')





// Get memory usage data
const memoryData = process.memoryUsage();

// Format memory usage data
const memoryUsage = {
    rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
    heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
    heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
    external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
};

// Print memory usage to console
console.log(memoryUsage);

// Function to format memory usage
function formatMemoryUsage(bytes) {
    return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}


module.exports= statusMonitor
