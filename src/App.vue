<template>
  <div id="app">
  <form name="Equipment" method="POST" data-netlify="true">
    <div class="container">
      <div class="row">
          <label>Customer: <input type="text" name="name" /></label>   
      </div>
      <div class="row">
          <label>Address: <textarea rows="4" cols="50"></textarea></label>
      </div>
      <div class="row">
       <table class="table">
            <thead>
                <tr>
                    <td><strong>KGC,LLP Equipment</strong></td>
                    <td><strong>Eqpt#</strong></td>
                    <td><strong>Hrs Used</strong></td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(row, index) in rows">

                    <td><select v-model="row.equip" name="equipment">
                      <option value="Truck & Tools">Truck & Tools</option>
                      <option value="Backhoe">Backhoe</option>
                      <option value="Drill Rig - Tool Truck">Drill Rig - Tool Truck</option>
                      <option value="Drill Rig (Foundation)">Drill Rig (Foundation)</option>
                      <option value="Dump Truck (Bobtail)">Dump Truck (Bobtail)</option>
                      <option value="Dump Truck (Super 10)">Dump Truck (Super 10)</option>
                      <option value="Well - Tool Truck">Well - Tool Truck</option>
                      <option value="Well - Drill / Wtr Trk / Mud">Well - Drill / Wtr Trk / Mud</option>
                      <option value="Skid Steer">Skid Steer</option>
                      <option value="Mini-Excavator">Mini-Excavator</option>
                      <option value="Skip Loader">Skip Loader</option>
                      <option value="Compactor (Upright)">Compactor (Upright)</option>
                      <option value="Compactor (Ride-on)">Compactor (Ride-on)</option>
                      <option value="Compressor Truck (Demo)">Compressor Truck (Demo)</option>
                      <option value="Compressor (Towable)">Compressor (Towable)</option>
                      <option value="Forklift (Reach) 5K">Forklift (Reach) 5K</option>
                      <option value="Forklift (Reach) 10K">Forklift (Reach) 10K</option>
                      <option value="Forklift (Warehouse)">Forklift (Warehouse)</option>
                      <option value="Generator / Welder">Generator / Welder</option>
                      <option value="Scissor Lift">Scissor Lift</option>
                      <option value="Trencher (Ride-on)">Trencher (Ride-on)</option>
                      <option value="Trencher (Walk Behind)">Trencher (Walk Behind)</option>
                      <option value="Water Trailer">Water Trailer</option>
                      <option value="Water Truck (2000 gal.)">Water Truck (2000 gal.)</option>
                      <option value="Development Rig">Development Rig</option>
                      <option value="Rail Rig">Rail Rig</option>
                      <option value="Welding Truck">Welding Truck</option>
                      <option value="Compressor (Small)">Compressor (Small)</option>
                      <option value="P&D (Portal to Portal)">P&D (Portal to Portal)</option>
                    </select></td>
                    <td><input type="text" v-model="row.equipNo"></td>
                    <td><input type="text" v-model="row.hrs"></td>
                    <td>
                        <button v-on:click="removeElement(index);" class="btn btn-outline-secondary" style="cursor: pointer">Remove</button>
                    </td>

                </tr>
                <tr>
                  <button class="btn btn-outline-primary" @click="addRow">Add more</button>
                </tr>
            </tbody>
        </table>
            

      </div>
      
      <div class="row">
          <div class="col-12 mt-2">
          <h1> Customer Signature </h1>
          <img v-show="!sigInputShow" v-bind:src="savedPNG" alt="Saved image png"/>
          <VueSignaturePad
            v-show="sigInputShow"
            id="signature"
            width="100%"
            height="300px"
            ref="signaturePad"
          />
        </div>
        <div class="col-6 mt-2">
          <button
            class="btn btn-outline-secondary float-right"
            @click="clear"
          >
            Clear
          </button>
        </div>
        <div class="col-6 mt-2">
          <button
            v-show="sigInputShow"
            class="btn btn-outline-primary float-left"
            @click="save"
          >
            Save
          </button>
        </div>

          <br/>
          <br/>
          <br/>

          <button
            type="submit"
            class="btn btn-online-primary float-left"
          >
            Submit
          </button>
      </div>

    </div>
  </form>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      savedPNG: '',
      sigInputShow: true,
      rows: [],
      }
  },
  methods: {
    clear() {
      this.$refs.signaturePad.clearSignature();
      this.sigInputShow = true;
    },
    save() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      console.log(isEmpty);
      console.log(data);
      /*  isEmpty cannot be used in the if statement below....not sure why.  Need to troubleshoot. bl 9/3/19
      
      if isEmpty {
      this.savedPNG = 'data:image/png;base64,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'
      
      }*/
      this.savedPNG = data;
      this.sigInputShow = false;
    },
    addRow() {
      var elem = document.createElement('tr');
      this.rows.push({
         equip: "",
         equipNo: "",
         hrs: "",
      });
    },
    
    removeElement(index) {
      this.rows.splice(index, 1);1
    },
  }
};
</script>

<style>
#signature {
  border: double 3px transparent;
  border-radius: 5px;
  background-image: linear-gradient(white, white),
    radial-gradient(circle at top left, #4bc5e8, #9f6274);
  background-origin: border-box;
  background-clip: content-box, border-box;
}
</style>
