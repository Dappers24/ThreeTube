import {exec} from 'child_process'
import { stderr, stdout } from 'process';

async function segmentVideo(inputPath , outputFolder){
    // setx /m PATH "ffmpeg bin folder path;%PATH%"
    const hlsPath = `${outputFolder}/playlist.m3u8`;
    const ffmpegCommand = `ffmpeg -i ${inputPath} -codec:v libx264 
    -codec:a aac -hls_time 1 -hls_playlist_type vod -hls_segment_filename 
    "${outputFolder}/segment%03dts" -start_number 0 ${hlsPath}`;

    exec(ffmpegCommand , (error , stdout , stderr)=>{
        if(error){
             console.log(`exec error: ${error}`);
             return false
        }
        console.log(`stdout:${stdout}`);
        console.log(`stderr:${stderr}`);
        return true
    })

    // const outputOptions = ['-c:v libx264','-crf 23','-preset veryfast','-hls_time 1', '-hls_playlist_type vod','-hls_segment_filename',`${outputFolder}/segment_%03d.ts`]

    // try {
    //     await new Promise((resolve , reject)=>{
    //         ffmpeg(inputPath).output(`${outputFolder}/playlist.m3u8`)
    //         .outputOptions(outputOptions)
    //         .on('end',()=>{
    //             resolve()
    //         }).on('error',(error)=>{
    //             reject(error)
    //         }).run()
    //     })
    //     return true
    // } catch (error) {
    //     console.log(error)
    //     return false
    // }
}

export {segmentVideo}