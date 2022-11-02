export function formatTime(timestamp: number) {

    if (!timestamp) return '00:00:00'

    var hours = Math.floor(timestamp / 60 / 60);
    var minutes = Math.floor(timestamp / 60) - (hours * 60);
    var seconds = Math.floor(timestamp % 60);
    
    return hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
}

export function formatBandWidth(bytes: number){
	var maybeMB = bytes / 1024000
	if((bytes / 1024000) < 1) return (bytes / 1024).toFixed(1) + ' KB/s'
	else return maybeMB.toFixed(1) + ' MB/s'
}

export function formatProgress(progress: number){
	return (progress * 100).toFixed(0) + '%'
}

export function translateForPortuguese(title: string){
  if(!title) return null
  	
  return String(title).toLowerCase().replace(/por/g, 'Português').replace(/eng/g, 'Inglês')
}