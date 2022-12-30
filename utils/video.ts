export const isVideoFile = (filename: string) => {
	if(filename.endsWith(".mkv") || filename.endsWith(".mp4") || filename.endsWith(".avi")) return true
    else return false
}

export const getValidFileNameDefault = (files: string[]) => {
	var name = null
	
    files.sort((a,b) => {
		if (a > b) return -1
		if (a < b) return 1
		return 0
	})
	
	for (var file of files) {
		if(file.endsWith(".mkv")) return file
		else if(file.endsWith(".mp4") || file.endsWith(".avi")) name = file
	}
	
	return name
}