<template>
  <div>
    <canvas ref="canvas" id='drawing-pad' width='300' height='200'>
    </canvas>
</div>
</template>

<script>
export default {
  /* eslint-disable */
    data(){
        return{
        canvas: null,
        context: null,
        isDrawing: false,
        dataURL:null,
        startX: 0,
        startY: 0,
        points: [],
        }
    },
    mounted(){
        var vm = this
        vm.canvas = vm.$refs.canvas
        vm.context = vm.canvas.getContext("2d");
        vm.canvas.addEventListener('mousedown', vm.mousedown);
        vm.canvas.addEventListener('mousemove', vm.mousemove)
        document.addEventListener('mouseup', vm.mouseup);

        vm.canvas.addEventListener('touchstart', vm.touchstart);
        vm.canvas.addEventListener('touchmove', vm.touchmove)
        vm.canvas.addEventListener('touchend', vm.touchend);
        
    },
    methods:{
        dataSubmit: function(){
          this.$emit('childEvent',this.dataURL);
        },
        mousedown(e){
        var vm = this
        var rect = vm.canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        
        vm.isDrawing = true;
        vm.startX = x;
        vm.startY = y;
        vm.points.push({
            x: x,
            y: y
        });
        },
        mousemove(e){
        var vm = this
        var rect = vm.canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;

        if (vm.isDrawing) {
        vm.context.beginPath();
        vm.context.moveTo(vm.startX, vm.startY);
        vm.context.lineTo(x, y);
        vm.context.lineWidth = 1;
        vm.context.lineCap = 'round';
        vm.context.strokeStyle = "rgba(0,0,0,1)";
        vm.context.stroke();
        
        vm.startX = x;
        vm.startY = y;  
        
        vm.points.push({
          x: x,
          y: y
          });
        }
      },
        mouseup(e){
            var vm = this
            vm.isDrawing = false;
            if (vm.points.length > 0) {
                localStorage['points'] = JSON.stringify(vm.points);    
            }
             vm.dataURL = vm.canvas.toDataURL();
             this.dataSubmit();

        },



    touchstart(e){
        var vm = this
        var rect = vm.canvas.getBoundingClientRect();
        var x =  e.touches[0].clientX  - rect.left;
        var y = e.touches[0].clientY - rect.top;
        
        vm.isDrawing = true;
        vm.startX = x;
        vm.startY = y;
        vm.points.push({
            x: x,
            y: y
        });
        e.preventDefault();
        },
        touchmove(e){
        var vm = this
        var rect = vm.canvas.getBoundingClientRect();
        var x = e.touches[0].clientX  - rect.left;
        var y = e.touches[0].clientY - rect.top;

        if (vm.isDrawing) {
        vm.context.beginPath();
        vm.context.moveTo(vm.startX, vm.startY);
        vm.context.lineTo(x, y);
        vm.context.lineWidth = 1;
        vm.context.lineCap = 'round';
        vm.context.strokeStyle = "rgba(0,0,0,1)";
        vm.context.stroke();
        
        vm.startX = x;
        vm.startY = y;  
        
        vm.points.push({
          x: x,
          y: y
          });
        }
        e.preventDefault();
      },
        touchend(e){
            var vm = this
            vm.isDrawing = false;
            if (vm.points.length > 0) {
                localStorage['points'] = JSON.stringify(vm.points);    
            }
             vm.dataURL = vm.canvas.toDataURL();
             this.dataSubmit();

        },

        resetCanvas(){
          var vm = this
          vm.canvas.width = vm.canvas.width;
          vm.points.length = 0; // reset points array
        },
  }
    }
</script>

<style>

</style>