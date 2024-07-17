import { db } from '../../main'
import axios from 'axios'
import toastr from 'toastr';


export default {
    data: () => ({
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      menuDate: false,
      timeStart: null,
      timeEnd: null,
      menuTimeStart: false,
      menuTimeEnd: false,
      createEvent: null,
      focus: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
      valid: true,
      // timeStartRules: [
      //   v => !!v || 'Hora Inicio Obligatoria',
      // ],
      usuarios: JSON.parse(localStorage.getItem('usuarios')),
    }),

    computed: {
      dayRules () {

        const dayRules = []

        let rule;

        let dateFromString = this.date.split("-");

        const dateStart = new Date( dateFromString[0], dateFromString[1] - 1, dateFromString[2] );

        const dateToday = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);

        rule = 
        v => Date.parse(dateToday) < Date.parse(dateStart) || 'El dia escogido es invalido'

        dayRules.push(rule);

        return dayRules;
      },
      timeStartRules () {
        const timeStartRules = []

        let noColision = true;

        let rule;

          rule =
          v => !!v || 'Hora Inicio Obligatoria'

          timeStartRules.push(rule)
        
        if (this.timeStart != null) {

          let dateFromString = this.date.split("-");

          let timeStartFromString = this.timeStart.split(":");

          const dateStart = new Date( dateFromString[0], dateFromString[1] - 1, dateFromString[2], timeStartFromString[0], timeStartFromString[1], "00")

          rule =
              v => Date.parse(new Date()) < Date.parse(dateStart) || 'Hora inicio menor que Hora Actual'

              timeStartRules.push(rule)

          if (this.timeEnd != null) {

            let timeEndFromString = this.timeEnd.split(":");

            
            const dateEnd = new Date( dateFromString[0], dateFromString[1] - 1, dateFromString[2], timeEndFromString[0], timeEndFromString[1], "00" )

            rule =
              v => Date.parse(dateEnd) > Date.parse(dateStart) || 'Hora inicio mayor que Hora Final'

              timeStartRules.push(rule)


            rule =
              v => Date.parse(dateEnd) != Date.parse(dateStart) || 'Hora inicio Igual que Hora Final'

              timeStartRules.push(rule)

            for (let i = 0; i < this.events.length; i++) {
              const element = this.events[i];
              if ((element.start > Date.parse(dateStart) && element.start < Date.parse(dateEnd)) || (element.end > Date.parse(dateStart) && element.end < Date.parse(dateEnd))) {
                noColision = false
              } else if ((element.start < Date.parse(dateStart) && element.start > Date.parse(dateEnd)) || (element.end < Date.parse(dateStart) && element.end > Date.parse(dateEnd))
                            || (element.start == Date.parse(dateStart) && element.end == Date.parse(dateEnd))) {
                noColision = false
              }
            }

            rule =
              v => noColision || 'Tiempo Reservado'

              timeStartRules.push(rule)
          }
        }

        return timeStartRules
      },

      timeEndRules () {
        const timeEndRules = []

        let noColision = true;

        let rule;

          rule =
          v => !!v || 'Hora Final Obligatoria'

          timeEndRules.push(rule)
        

        if (this.timeEnd != null && this.timeStart != null) {

          let dateFromString = this.date.split("-");

          let timeStartFromString = this.timeStart.split(":");

          let timeEndFromString = this.timeEnd.split(":");

          const dateStart = new Date( dateFromString[0], dateFromString[1] - 1, dateFromString[2], timeStartFromString[0], timeStartFromString[1], "00")
          const dateEnd = new Date( dateFromString[0], dateFromString[1] - 1, dateFromString[2], timeEndFromString[0], timeEndFromString[1], "00" )

          rule =
            v => Date.parse(dateEnd) > Date.parse(dateStart) || 'Hora Final menor que Fecha inicio'

            timeEndRules.push(rule)


          rule =
            v => Date.parse(dateEnd) != Date.parse(dateStart) || 'Hora Final Igual que Fecha inicio'

            timeEndRules.push(rule)

          for (let i = 0; i < this.events.length; i++) {
            const element = this.events[i];
            if ((element.start > Date.parse(dateStart) && element.start < Date.parse(dateEnd)) || (element.end > Date.parse(dateStart) && element.end < Date.parse(dateEnd))) {
              noColision = false
            } else if ((element.start < Date.parse(dateStart) && element.start > Date.parse(dateEnd)) || (element.end < Date.parse(dateStart) && element.end > Date.parse(dateEnd))
                        || (element.start == Date.parse(dateStart) && element.end == Date.parse(dateEnd))) {
                noColision = false
            }
          }

          rule =
            v => noColision || 'Tiempo Reservado'

            timeEndRules.push(rule)
        }

        return timeEndRules
      },
    },

    methods: {
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = this.date
        this.menuDate = false
      },
      async createEventForm () {
        console.log("Entra a la función crear evento");
        await this.$refs.form.validate()

        if (this.valid) {

          let dateFromString = this.date.split("-");
          console.log("Entra a la función crear evento", dateFromString);

          let timeStartFromString = this.timeStart.split(":");
          console.log("Entra a la función crear evento", timeStartFromString);

          let timeEndFromString = this.timeEnd.split(":");
          console.log("Entra a la función crear evento", timeEndFromString);


          const dateStart = new Date( dateFromString[0], dateFromString[1] - 1, dateFromString[2], timeStartFromString[0], timeStartFromString[1], "00")
          const dateEnd = new Date( dateFromString[0], dateFromString[1] - 1, dateFromString[2], timeEndFromString[0], timeEndFromString[1], "00" )
          //const dateStart= new Date
          const hourStart = this.timeStart + ":" +"00"
          const hourEnd = this.timeEnd+ ":" +"00"

          //console.log("la fecha de inicio: " + hourStart);
          //console.log("la fecha de inicio: " + hourEnd);

          this.createEvent = {
            userId: this.usuarios.userId,
            fecha:this.date,
            horaInicio: hourStart,
            horaFin: hourEnd,
            color: this.rndElement(this.colors),
            timed: true,
        };
        console.log(this.createEvent);

        try {
          const response = await axios.post('http://localhost:5430/horario/reservar', this.createEvent);
          console.log(this.createEvent);
          console.log(response.data);
          toastr.success('Horario reservado con éxito','Éxito')
          // Actualizar la lista de eventos después de crear uno nuevo
          this.fetchEvents();
        } catch (error) {
          console.error('Error reservando el horario:', error.response.data);
          toastr.error('Error al reservar horario, intente nuevemente','Error')
          }
        }
      },

      async fetchEvents() {
        try {
          const response = await axios.get('/api/sesiones');
          this.events = response.data.map(event => {
            return {
              ...event,
              start: Date.parse(event.horaInicio),
              end: Date.parse(event.horaFin)
            };
          });
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      },

      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
      rndElement (arr) {
        return arr[this.rnd(0, arr.length - 1)]
      },
    },
  }