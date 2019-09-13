<template>
  <div id="app">
    <div class="container">

      <div class="row">
          <input type="text" placeholder='name' v-model="name" /> 
      </div>
      <div class="row">
          <input type="email" placeholder='email' v-model="email" />
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
          <div class="col-11 mt-2">
          <h1> Customer Signature </h1>
          <VueSignaturePad
            id="signature"
            width="100%"
            height="150px"
            ref="signaturePad"
          />
        </div>
        <div class="col-5 mt-2">
          <button
            class="btn btn-outline-secondary float-right"
            @click="clear"
          >
            Clear
          </button>
        </div>
        <div class="col-6 mt-2">
          <button
            class="btn btn-outline-primary float-left"
            @click="submit"
          >
            Submit
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      name: '',
      email: '',
      savedPNG: '',
      rows: [],
      }
  },
  methods: {
    clear() {
      this.$refs.signaturePad.clearSignature();
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
    submit: async function() {
      // save signature
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature()
      this.savedPNG = data

      // fetch params init
      const { name, email, savedPNG } = this
      const opts = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, savedPNG })
      }
      
      // fetch workflow
      // const response = await fetch('http://localhost:3000/form_submit', opts)
      // if (response.ok){
      //   const data = await response.json()
      //   console.log(data)
      // } else {
      //   throw Error(response.statusText)
      // }

      //clear all fields
      this.$refs.signaturePad.clearSignature()
      this.name = ''
      this.email = ''
      this.savedPNG = ''
      
    }
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
