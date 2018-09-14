
const notification = (vueInstance, message, type = 'info', horizontal = 'right', vertical = 'top', icon = 'add_alert') => {
  vueInstance.$notify({
    message: message,
    icon: icon,
    horizontalAlign: horizontal,
    verticalAlign: vertical,
    type: type
  })
}

export default notification
