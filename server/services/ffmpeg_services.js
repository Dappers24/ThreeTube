async function segmentVideo(inputPath , outputFolder){
    
    const outputOptions = ['-c:v libx264','-crf 23','-preset veryfast','-hls_time 20', '-hls_playlist_type vod','-hls_segment_filename']

    try {
        await new Promise((resolve , reject)=>{
            ffmpeg(inputPath).output(`${outputFolder}/video_%03d.ts`)
            .outputOptions([...outputOptions, `${outputFolder}/segment_%03d.ts`])
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