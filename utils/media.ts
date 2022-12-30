export function extractEpisodeNumberRange(value: string): string {

    const regexSeasonEpisode = /s[\d+][\d+]*e[\d+][\d+|-]*/g;

    value = value.toLocaleLowerCase();

    var match = value.match(regexSeasonEpisode)?.sort();

    return match?.[0]?.split('e')[1] || ''
}