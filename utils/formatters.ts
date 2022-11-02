const URL_API_STREAM = process.env.NEXT_PUBLIC_URL_API_STREAM

export const getValidNameMovie = async (files: string[]) => {
	var name = null
	
    files.sort((a,b) => {
		if (a > b) return -1
		if (a < b) return 1
		return 0
	})
	
	for await (var file of files) {
		if(file.endsWith(".mkv")) return file
		else if(file.endsWith(".mp4") || file.endsWith(".avi")) name = file
	}
	
	return name
}

export const getValidNameEpisodes = async (files: string[]) => {
	var names = []
	
	files.sort((a,b) => {
		if (a > b) return 1
		if (a < b) return -1
		return 0
	})
	
	for await (var file of files) {
		if(file.endsWith(".mkv") || file.endsWith(".mp4") || file.endsWith(".avi")) names.push(file)
	}
	
	return names
}

export async function getValidNameSubtitles(files: string[]){
	var names = []
	
	for await (var file of files) {
	  if(file.endsWith(".srt") || file.endsWith(".vtt")) names.push(file)
	}
	
	return names
}

export function formatURIStreamFileOffline(path: string) {
	return `${URL_API_STREAM}/torrent/stream/offline?path=${path}`
}