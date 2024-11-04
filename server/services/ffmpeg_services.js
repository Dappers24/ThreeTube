import Ffmpeg from 'fluent-ffmpeg';

async function segmentVideo(inputPath , outputFolder){

    const outputOptions = ['-codec:v', 'libx264', '-codec:a', 'aac','-hls_time', '1','-hls_playlist_type', 'vod',
        '-hls_segment_filename', `${outputFolder}/segment_%03d.ts`, '-start_number', '0']
    try {
        await new Promise((resolve , reject)=>{
            Ffmpeg(inputPath).output(`${outputFolder}/playlist.m3u8`)
            .outputOptions(outputOptions)
            .on('end',()=>{
                resolve()
            }).on('error',(error)=>{
                reject(error)
            }).run()
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export {segmentVideo}