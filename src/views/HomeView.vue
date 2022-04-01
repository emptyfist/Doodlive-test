<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
          <video
            id="dPlayerVideoMain"
            ref="refdVideo"
            width="100%"
            height="640"
            controls
          >
          </video>
        </div>
        <div class="col-md-4 chat-container">
          <ChatItem />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Hls from 'hls.js'
import ChatItem from '@/components/ChatItem.vue'

@Options({
  props: {
  },
  components: {
    ChatItem
  }
})
export default class HomeView extends Vue {
  mounted() {
    if (Hls.isSupported()) {
      // console.log('Hls is supported !')

      let video = this.$refs["refdVideo"]
      let hls = new Hls()
      hls.detachMedia()
      hls.attachMedia(video as HTMLMediaElement)
      hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        // console.log('video and hls.js are now bound together !')
        let stream = 'https://stream.mux.com/AHtNUiG600zlYSjecA5Nnp6OPitww802KLUnX023WnL118.m3u8'
        hls.loadSource(stream)
        // hls.on(Hls.Events.MANIFEST_PARSED, (ev, data) => {
          // console.log('manifest loaded, found ' + data.levels.length + ' quality level')
          // console.log('Trying to load and play a streaming video.')
          // video.play()
        // })
      });
    } else {
      // console.log('Hls is not supported !')
    }
  }
}
</script>
