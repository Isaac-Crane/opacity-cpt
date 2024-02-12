var show_probes = true


var probe1 = {
	type: 'html-slider-response',
	stimulus: `<p>How much do you agree with the following statement:</p>
	<p>My thoughts just now were related to the task</p>
	`,
	labels: ['Not at all', 'Completely'],
	trial_duration: 20000
}

var probe2 = {
	type: 'html-slider-response',
	stimulus: `<p>How much do you agree with the following statement:</p>
	<p>My thoughts just now were related to my internal thoughts</p>
	`,
	labels: ['Not at all', 'Completely'],
	trial_duration: 20000
}

call_probes = {
	timeline: [probe1, probe2]
}

var timeline_fullscreen = {
	type: 'fullscreen',
	fullscreen_mode: true,
}

var display_consent = {
	type: 'image-button-response',
	stimulus: './images/CABLab_behavior_online_consent_V3.png',
	stimulus_height: 800,
	choices: ['I agree', 'No thanks, I do not want to do this study'],
	on_finish: function(data){
		if (data.response==1){
			jsPsych.endCurrentTimeline()
		}
	},
}

var demo_sex_options = ['Male', 'Female', 'Intersex', 'None of these describe me', 'Choose not to respond']
var demo_gender_options = ['Man', 'Woman', 'Non-binary', 'Other', 'Choose not to respond']
var demo_age_options = ['18-24','25-34','35-44','45-54','55-64','65-74','75-84','85 or older']
var demo_ethnicity_options = ['Hispanic/Latino','Not Hispanic/Latino','Choose not to respond']
var demo_ed_options = ['Less than a high school diploma','High school degree or equivalent (e.g. GED)','Some college, no degree','Associate degree (e.g. AA, AS)','College degree',`Master's degree (e.g. MA, MS, MEd)`,'Doctorate or professional degree (e.g. MD, DDS, PhD)']


var demographics1 = {
	type: 'survey-multi-choice',
	preamble: '<br><br><br><br>Thank you for participating in the experiment. Please tell us about yourself. <br><br>Red asterisks indicate required questions.',
	questions: [
		{prompt: 'What was your biological sex assigned at birth?', name: 'demo_sex', options: demo_sex_options, required:true},
		{prompt: 'What is your gender?', name: 'demo_gender', options: demo_gender_options, required:true},
		{prompt: 'What is your age?', name: 'demo_age', options: demo_age_options, required:true},
		{prompt: 'What is your ethnicity?', name: 'demo_ethnicity', options: demo_ethnicity_options, required:true},
		{prompt: 'What is the highest degree or level of school you have completed?', name: 'demo_ed', options: demo_ed_options, required:true},
	],
	data:{task: 'demographics1'},
}

var demo_race_options = ['American Indian/Native American','White','Black/African American','Asian','Native Hawaiian or Pacific Islander','Other','Choose not to respond']

var demographics2 = {
	type: 'survey-multi-select',
	questions: [
		{prompt: 'How would you describe yourself?', name: 'demo_race', options: demo_race_options, required:true},
	],
	data:{task: 'demographics2_race'},
}



var clin_options = ['Anxiety disorders (e.g., generalized anxiety disorder)', 'Depressive disorders', 'Trauma/stress-related disorders (e.g., posttraumatic stress disorder)', 'Neurodevelopmental disorders (e.g., ADHD)', 'Schizophrenia spectrum or other psychotic disorder', 'Bipolar and related disorders', 'Obsessive-compulsive and related disorders', 'Eating disorders', 'Other', 'None of these']

var clin_diag = {
	type: 'survey-multi-select',
	questions: [
		{prompt: '<br><br><br><br>Have you ever been treated for any emotional or psychiatric issues? (Select all that apply)', name: 'clinical_diagnoses', options: clin_options, required: true}
	],
	data:{task: 'clinical_diagnoses'},
}







var PSS_options = ['Never', 'Almost Never', 'Sometimes', 'Fairly Often', 'Very Often']

var PSS_1 = {
	type: 'survey-likert-PSS_AC',
	preamble: '<br><br><br><br>The next set of questions ask you about your feelings and thoughts during the <strong>last month</strong>. <br><br>In each case, you will be asked to indicate by clicking how often you <strong>felt</strong> or <strong>thought</strong> a certain way. <br><br>',
	questions:[
		{prompt: 'In the last month, how often have you been upset because of something that happened unexpectedly?', name: 'PSS_Q1', labels: PSS_options, required:true},
		{prompt: 'In the last month, how often have you felt that you were unable to control the important things in your life?', name: 'PSS_Q2', labels: PSS_options, required:true},
		{prompt: 'In the last month, how often have you felt nervous and "stressed"?', name: 'PSS_Q3', labels: PSS_options, required:true},
		{prompt: 'In the last month, how often have you felt confident about your ability to handle your personal problems?', name: 'PSS_Q4', labels: PSS_options, required:true},
		{prompt: 'In the last month, how often have you felt that things were going your way?', name: 'PSS_Q5', labels: PSS_options, required:true},
		{prompt: 'In the last month, how often have you found that you could not cope with all the things that you had to do?', name: 'PSS_Q6', labels: PSS_options, required:true},
		{prompt: 'In the last month, how often have you been able to control irritations in your life?', name: 'PSS_Q7', labels: PSS_options, required:true},
		{prompt: 'In the last month, how often have you felt that you were on top of things?', name: 'PSS_Q8', labels: PSS_options, required:true},
		{prompt: 'In the last month, how often have you been angered because of things that were outside of your control?', name: 'PSS_Q9', labels: PSS_options, required:true},
		{prompt: 'In the last month, how often have you felt difficulties were piling up so high that you could not overcome them?', name: 'PSS_Q10', labels: PSS_options, required:true},
	],
	data:{task: 'PSS_1'},
	scale_width: 700,
	on_finish: function() {
		var ind = jsPsych.data.getLastTimelineData().values().length
				// console.log('PSS1_resp_timeline_LENGTH', ind)
		var pss_resp = jsPsych.data.getLastTimelineData().values()[ind-1].response;
		// console.log('PSS1_resp_timeline', pss_resp)
		var PSS_sum = pss_resp.PSS_Q1 + pss_resp.PSS_Q2 + pss_resp.PSS_Q3 + Math.abs(pss_resp.PSS_Q4 - 4) + Math.abs(pss_resp.PSS_Q5 - 4) + pss_resp.PSS_Q6 + Math.abs(pss_resp.PSS_Q7 - 4) + Math.abs(pss_resp.PSS_Q8 - 4) + pss_resp.PSS_Q9 + pss_resp.PSS_Q10
		// console.log('PSS_Q1_check', PSS_sum)
		jsPsych.data.addProperties({PSS_1_total: PSS_sum});
	},
}

var PANAS_options = ['Very slightly or not at all', 'A little', 'Moderately', 'Quite a bit', 'Extremely']
  
  var PANAS_1 = {
	type: 'survey-likert-PANAS_AC',
	preamble:'<br><br><br><br>This scale consists of a number of words that describe different feelings and emotions. <br>Read each item and then check the appropriate answer next to that word. <br><br>Indicate to what extent you feel this way <strong>right now</strong> (that is, at the <strong>present moment</strong>).',
	questions: [
		{prompt:'Interested',name:'PANAS_Q1', labels: PANAS_options, required:true},
		{prompt:'Distressed',name:'PANAS_Q2', labels: PANAS_options ,required:true},
		{prompt:'Excited',name:'PANAS_Q3', labels: PANAS_options ,required:true},
		{prompt:'Upset',name:'PANAS_Q4', labels: PANAS_options ,required:true},
		{prompt:'Strong',name:'PANAS_Q5', labels: PANAS_options ,required:true},
		{prompt:'Guilty',name:'PANAS_Q6', labels: PANAS_options ,required:true},
		{prompt:'Scared',name:'PANAS_Q7', labels: PANAS_options ,required:true},
		{prompt:'Hostile',name:'PANAS_Q8', labels: PANAS_options ,required:true},
		{prompt:'Enthusiastic',name:'PANAS_Q9', labels: PANAS_options ,required:true},
		{prompt:'Proud',name:'PANAS_Q10', labels: PANAS_options ,required:true},
		{prompt:'Irritable',name:'PANAS_Q11', labels: PANAS_options ,required:true},
		{prompt:'Alert',name:'PANAS_Q12', labels: PANAS_options ,required:true},
		{prompt:'Ashamed',name:'PANAS_Q13', labels: PANAS_options ,required:true},
		{prompt:'Inspired',name:'PANAS_Q14', labels: PANAS_options ,required:true},
		{prompt:'Nervous',name:'PANAS_Q15', labels: PANAS_options ,required:true},
		{prompt:'Determined',name:'PANAS_Q16', labels: PANAS_options ,required:true},
		{prompt:'Attentive',name:'PANAS_Q17', labels: PANAS_options ,required:true},
		{prompt:'Jittery',name:'PANAS_Q18', labels: PANAS_options ,required:true},
		{prompt:'Active',name:'PANAS_Q19', labels: PANAS_options ,required:true},
		{prompt:'Afraid',name:'PANAS_Q20', labels: PANAS_options ,required:true},
	],
	data:{task: 'PANAS_1'},
	scale_width: 700,


	on_finish: function() {
		var ind = jsPsych.data.getLastTimelineData().values().length
		// console.log('PSS1_resp_timeline_LENGTH', ind)
		var panas_resp = jsPsych.data.getLastTimelineData().values()[ind-1].response;
		// console.log('PSS1_resp_timeline', pss_resp)
		
		var PANAS_pos = panas_resp.PANAS_Q1 + panas_resp.PANAS_Q3 + panas_resp.PANAS_Q5 + panas_resp.PANAS_Q9 + panas_resp.PANAS_Q10 + panas_resp.PANAS_Q12 + panas_resp.PANAS_Q14 + panas_resp.PANAS_Q16 + panas_resp.PANAS_Q17 + panas_resp.PANAS_Q19 + 10
		//  console.log('PANAS_Q1_pos', PANAS_pos)
		var PANAS_neg = panas_resp.PANAS_Q2 + panas_resp.PANAS_Q4 + panas_resp.PANAS_Q6 + panas_resp.PANAS_Q7 + panas_resp.PANAS_Q8 + panas_resp.PANAS_Q11 + panas_resp.PANAS_Q13 + panas_resp.PANAS_Q15 + panas_resp.PANAS_Q18 + panas_resp.PANAS_Q20 + 10
		// console.log('PANAS_Q1_neg', PANAS_neg)
		jsPsych.data.addProperties({PANAS_1_positive: PANAS_pos, PANAS_1_negative: PANAS_neg});
	},
  };


relevant = Math.floor(Math.random()*2)
frequent = Math.floor(Math.random()*2)
secondFrequent = Math.floor(Math.random()*2)
if (relevant == 0){
	relevantType = "face"
	irrelevantType = "scene"
	if (frequent == 0){
		frequentType = "female"
		targetType = "male"
	}
	else{
		frequentType = "male"
		targetType = "female"
	}
	if (secondFrequent == 0){
		secondFrequentType = "indoor"
	}
	else{
		secondFrequentType = "outdoor"
	}
}
else{
	relevantType = "scene"
	irrelevantType = "face"
	if (frequent == 0){
		frequentType = "indoor"
		targetType = "outdoor"
	}
	else{
		frequentType = "outdoor"
		targetType = "indoor"
	}
	if (secondFrequent == 0){
		secondFrequentType = "male"
	}
	else{
		secondFrequentType = "female"
	}
}
var opacity = 0.5
var allStimuli = generateRandomStimuli(relevantType, frequentType, secondFrequentType)
var randomizedStimuli = allStimuli[0]
var memStimuli = allStimuli[1]
///var randomizedRetrocueStimuli = generateRetrocueRandomStimuli()
preloadArray = []
totalPracticeTrials = 10
randomizedPracticeStimuli = generatePracticeStimuli()
console.log(memStimuli.length)
for (i = 0; i < randomizedStimuli.length; i++){
	preloadArray.push(randomizedStimuli[i].Face)
	preloadArray.push(randomizedStimuli[i].Scene)
}

var preload = {
	type: 'preload',
		message: 'Loading',
		images: function(){
			return preloadArray
		},
		max_load_time: 120000,
		show_detailed_errors: true,
		continue_after_error: true
}

var instructions = {
	type: 'html-button-response',
	stimulus: function(){
		if (relevantType == "scene"){
			return 'You will see images of male and female faces overlaid on indoor and outdoor scenes.' +
				`<br><br>When you see an <strong>${frequentType} scene</strong>, press the <strong>spacebar</strong>.` +
				`<br>When you see an <strong>${targetType} scene</strong>, do not press any buttons` +
				`<br>There will be a dark gray dot in the center of the screen. If the dot changes to light gray, that means your response for that image has been recorded`+
				"<br><br> You will not need to do anything with the faces in the first part of the experiment."
		}
		else{
			return 'You will see images of male and female faces overlaid on indoor and outdoor scenes.' +
				`<br><br>When you see a <strong>${frequentType} face</strong>, press the <strong>spacebar</strong>.` +
				`<br>When you see a <strong>${targetType} face</strong>, do not press any buttons` +
				`<br>There will be a dark gray dot in the center of the screen. If the dot changes to light gray, that means your response for that image has been recorded`+
				"<br><br> You will not need to do anything with the scenes in the first part of the experiment."
		}
	},
	choices: ['Continue'],
	data:{task: 'instructions1'},
}

var overlay_task = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				return `<div style="position:relative; display: flex; justify-content: center;">
					<img src="`+jsPsych.timelineVariable('Face')+`" style="position: absolute; height: 255px; filter: grayscale(100%) ">
					<img src="`+jsPsych.timelineVariable('Scene')+`" style="position: relative;  opacity: `+opacity+`; filter: grayscale(100%) ">
					<span style="margin: 0;
					position: absolute;
					top: 50%;
					-ms-transform: translateY(-50%);
					transform: translateY(-50%);
					color: #303030">&#9679;</span>
				</div>`
			},
			response_type: 'key',
			response_ends_trial: false,
			choices: [' '],
			trial_duration: 1200,
			response_ends_trial: true,
			data: {
				Face: jsPsych.timelineVariable('Face'),
				faceType: jsPsych.timelineVariable('faceType'),
				Scene: jsPsych.timelineVariable('Scene'),
				sceneType: jsPsych.timelineVariable('sceneType'),
				relevant: relevantType,
				frequent: frequentType,
				task: 'opacityCPT'
			},
			on_finish: function(data) {
				if (data.relevant == 'face'){
					if (data.frequent == data.faceType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				else{
					if (data.frequent == data.sceneType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				if (data.response == data.correct_response){
					data.correct = true
				}
				else{
					data.correct = false
				}
				var d = new Date(); 
				data.rtt = d.getTime();
				data.opacity = opacity
				var priorData = jsPsych.data.get().filter({task: 'opacityCPT'}).values()
				data.trial_number = priorData.length //this starts at 1.
			}
		}
	]
}

var overlay_task_fill_in = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				return `<div style="position:relative; display: flex; justify-content: center;">
					
					<img src="`+jsPsych.timelineVariable('Face')+`" style="position: absolute; height: 255px; filter: grayscale(100%) ">
					<img src="`+jsPsych.timelineVariable('Scene')+`" style="position: relative;  opacity: `+opacity+`; filter: grayscale(100%) ">
					<span style="color: gray; margin: 0;
					position: absolute;
					top: 50%;
					-ms-transform: translateY(-50%);
					transform: translateY(-50%);">&#9679;</span>
				</div>`
			},
			response_type: 'key',
			response_ends_trial: false,
			choices: jsPsych.NO_KEYS,
			trial_duration: function(){
				prevVal = jsPsych.data.get().filter({task: 'opacityCPT'}).values()[jsPsych.data.get().filter({task: 'opacityCPT'}).values().length-1].rt
				return 1200-prevVal
			},
			response_ends_trial: false,
			data: {
				Face: jsPsych.timelineVariable('Face'),
				faceType: jsPsych.timelineVariable('faceType'),
				Scene: jsPsych.timelineVariable('Scene'),
				sceneType: jsPsych.timelineVariable('sceneType'),
				relevant: relevantType,
				frequent: frequentType,
				task: 'opacityCPTFillIn'
			},
		}
	]
}

var fill_in_if_node = {
	timeline: [overlay_task_fill_in],
	conditional_function: function(){
		if(jsPsych.data.get().filter({task: 'opacityCPT'}).values()[jsPsych.data.get().filter({task: 'opacityCPT'}).values().length-1].rt != null){
			return true;
		} else {
			return false;
		}
	}
}

var overlay_setup = {
	timeline: [overlay_task, fill_in_if_node],
	timeline_variables: randomizedStimuli,
}

var overlay_practice_task = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				return `<div style="position:relative; display: flex; justify-content: center;">
					<img src="`+jsPsych.timelineVariable('Face')+`" style="position: absolute; height: 255px; filter: grayscale(100%) ">
					<img src="`+jsPsych.timelineVariable('Scene')+`" style="position: relative;  opacity: `+opacity+`; filter: grayscale(100%) ">
					<span style="margin: 0;
					position: absolute;
					top: 50%;
					-ms-transform: translateY(-50%);
					transform: translateY(-50%);
					color: #303030">&#9679;</span>
				</div>`
			},
			response_type: 'key',
			response_ends_trial: false,
			choices: [' '],
			trial_duration: 1200,
			response_ends_trial: true,
			data: {
				Face: jsPsych.timelineVariable('Face'),
				faceType: jsPsych.timelineVariable('faceType'),
				Scene: jsPsych.timelineVariable('Scene'),
				sceneType: jsPsych.timelineVariable('sceneType'),
				relevant: relevantType,
				frequent: frequentType,
				task: 'practiceCPT'
			},
			on_finish: function(data) {
				if (data.relevant == 'face'){
					if (data.frequent == data.faceType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				else{
					if (data.frequent == data.sceneType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				if (data.response == data.correct_response){
					data.correct = true
				}
				else{
					data.correct = false
				}
				var d = new Date(); 
				data.rtt = d.getTime();
				data.opacity = opacity
				var priorData = jsPsych.data.get().filter({task: 'practiceCPT'}).values()
				data.trial_number = priorData.length //this starts at 1.
			}
		}
	]
}

var overlay_practice_task_fill_in = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				return `<div style="position:relative; display: flex; justify-content: center;">
					<img src="`+jsPsych.timelineVariable('Face')+`" style="position: absolute; height: 255px; filter: grayscale(100%) ">
					<img src="`+jsPsych.timelineVariable('Scene')+`" style="position: relative;  opacity: `+opacity+`; filter: grayscale(100%) ">
					<span style="color: gray; margin: 0;
					position: absolute;
					top: 50%;
					-ms-transform: translateY(-50%);
					transform: translateY(-50%);">&#9679;</span>
				</div>`
			},
			response_type: 'key',
			response_ends_trial: false,
			choices: jsPsych.NO_KEYS,
			trial_duration: function(){
				prevVal = jsPsych.data.get().filter({task: 'practiceCPT'}).values()[jsPsych.data.get().filter({task: 'practiceCPT'}).values().length-1].rt
				return 1200-prevVal
			},
			response_ends_trial: false,
			data: {
				Face: jsPsych.timelineVariable('Face'),
				faceType: jsPsych.timelineVariable('faceType'),
				Scene: jsPsych.timelineVariable('Scene'),
				sceneType: jsPsych.timelineVariable('sceneType'),
				relevant: relevantType,
				frequent: frequentType,
				task: 'opacityPracticeCPTFillIn'
			},
		}
	]
}

var fill_in_practice_if_node = {
	timeline: [overlay_practice_task_fill_in],
	conditional_function: function(){
		if(jsPsych.data.get().filter({task: 'practiceCPT'}).values()[jsPsych.data.get().filter({task: 'practiceCPT'}).values().length-1].rt != null){
			return true;
		} else {
			return false;
		}
	}
}

var overlay_practice_setup = {
	timeline: [overlay_practice_task, fill_in_practice_if_node],
	timeline_variables: randomizedPracticeStimuli,
}

var practice_report = {
	type: 'html-button-response',
	stimulus: function(){
		var priorData = jsPsych.data.get().filter({task: 'practiceCPT'}).values()
		sum = 0
		for (i = priorData.length-totalPracticeTrials; i < priorData.length; i++){
			if (priorData[i].correct == true){
				sum += 1
			}
		}
		accuracy = sum/totalPracticeTrials
		if (accuracy < 0.8){
			return 'You must get more than 80% on the practice. You got '+accuracy*100+'%. You must repeat the practice.'
		}
		else{
			return 'Well done! You got '+accuracy*100+'%. You will now move on to the real test.'
		}
	},
	choices: ['Continue'],
	data:{task: 'practice_report'},
}

var get_ready = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: `<p>Get ready</p>`,
			choices: jsPsych.NO_KEYS,
    		trial_duration: 3000,
		}
	]
}

var practice_loop = {
	timeline: [get_ready, overlay_practice_setup, call_probes, practice_report],
    loop_function: function(){
		var priorData = jsPsych.data.get().filter({task: 'practiceCPT'}).values()
		sum = 0
		for (i = priorData.length-totalPracticeTrials; i < priorData.length; i++){
			if (priorData[i].correct == true){
				sum += 1
			}
		}
		accuracy = sum/totalPracticeTrials
		if (accuracy < 0.8){
			return true
		}
		else{
			return false
		}
    }
}
var practice_instructions = {
	timeline: [
		{
			type: 'html-button-response',
			stimulus: `<p>You will now do some practice. If you don't get a high enough score on these you will not be allowed to move on.</p>
			<p>At the end of the practice you will be presented with 2 practice questions that may be presented during the real experiment. In both the practice and the experiment, answer honestly.`,
			choices: ['Continue']
		}
	]
}


var vertical_task = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				if (jsPsych.timelineVariable('randomVariable')==0){
					image1 = jsPsych.timelineVariable('Face')
					image2 = jsPsych.timelineVariable('Scene')
				}
				else{
					image1 = jsPsych.timelineVariable('Scene')
					image2 = jsPsych.timelineVariable('Face')
				}
				return `
					<img src="`+image1+`" style="height: 255px">
					<br>
					<img src="`+image2+`"style="height: 255px">
				`
			},
			response_type: 'key',
			response_ends_trial: false,
			choices: [' '],
			trial_duration: 1200,
			data: {
				Face: jsPsych.timelineVariable('Face'),
				faceType: jsPsych.timelineVariable('faceType'),
				Scene: jsPsych.timelineVariable('Scene'),
				sceneType: jsPsych.timelineVariable('sceneType'),
				relevant: relevantType,
				frequent: frequentType,
				task: 'verticalCPT'
			},
			on_finish: function(data) {
				if (data.relevant == 'face'){
					if (data.frequent == data.faceType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				else{
					if (data.frequent == data.sceneType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				if (data.response == data.correct_response){
					data.correct = true
				}
				else{
					data.correct = false
				}
				var d = new Date(); 
				data.rtt = d.getTime();
				var priorData = jsPsych.data.get().filter({task: 'verticalCPT'}).values()
				data.trial_number = priorData.length //this starts at 1.
				if (jsPsych.timelineVariable('randomVariable')==0){
					data.topImage = jsPsych.timelineVariable('Face')
					data.bottomImage = jsPsych.timelineVariable('Scene')
				}
				else{
					data.topImage = jsPsych.timelineVariable('Scene')
					data.bottomImage = jsPsych.timelineVariable('Face')
				}
			}
		}
	]
}
var vertical_setup = {
	timeline: [vertical_task],
	timeline_variables: randomizedStimuli,
}

var horizontal_task = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				if (jsPsych.timelineVariable('randomVariable')==0){
					image1 = jsPsych.timelineVariable('Face')
					image2 = jsPsych.timelineVariable('Scene')
				}
				else{
					image1 = jsPsych.timelineVariable('Scene')
					image2 = jsPsych.timelineVariable('Face')
				}
				return `
					<img src="`+image1+`" style="height: 255px">
					<img src="`+image2+`"style="height: 255px">
				`
			},
			response_type: 'key',
			response_ends_trial: false,
			choices: [' '],
			trial_duration: 1200,
			data: {
				Face: jsPsych.timelineVariable('Face'),
				faceType: jsPsych.timelineVariable('faceType'),
				Scene: jsPsych.timelineVariable('Scene'),
				sceneType: jsPsych.timelineVariable('sceneType'),
				relevant: relevantType,
				frequent: frequentType,
				task: 'horizontalCPT'
			},
			on_finish: function(data) {
				if (data.relevant == 'face'){
					if (data.frequent == data.faceType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				else{
					if (data.frequent == data.sceneType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				if (data.response == data.correct_response){
					data.correct = true
				}
				else{
					data.correct = false
				}
				var d = new Date(); 
				data.rtt = d.getTime();
				var priorData = jsPsych.data.get().filter({task: 'horizontalCPT'}).values()
				data.trial_number = priorData.length //this starts at 1.
				if (jsPsych.timelineVariable('randomVariable')==0){
					data.leftImage = jsPsych.timelineVariable('Face')
					data.rightImage = jsPsych.timelineVariable('Scene')
				}
				else{
					data.leftImage = jsPsych.timelineVariable('Scene')
					data.rightImage = jsPsych.timelineVariable('Face')
				}
			}
		}
	]
}
var horizontal_setup = {
	timeline: [horizontal_task],
	timeline_variables: randomizedStimuli,
}

var fixation_task = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				if (relevantType == "face"){
					image = jsPsych.timelineVariable('Face')
				}
				else{
					image = jsPsych.timelineVariable('Scene')
				}
				return `
					<img src="`+image+`" style="height: 255px">
				`
			},
			choices: [' '],
			response_type: 'key',
			response_ends_trial: false,
			choices: [' '],
			trial_duration: 1200,
			data: {
				Face: jsPsych.timelineVariable('Face'),
				faceType: jsPsych.timelineVariable('faceType'),
				Scene: jsPsych.timelineVariable('Scene'),
				sceneType: jsPsych.timelineVariable('sceneType'),
				relevant: relevantType,
				frequent: frequentType,
				task: 'fixationCPT'
			},
			on_finish: function(data) {
				if (data.relevant == 'face'){
					if (data.frequent == data.faceType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				else{
					if (data.frequent == data.sceneType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				if (data.response == data.correct_response){
					data.correct = true
				}
				else{
					data.correct = false
				}
				var d = new Date(); 
				data.rtt = d.getTime();
				var priorData = jsPsych.data.get().filter({task: 'fixationCPT'}).values()
				data.trial_number = priorData.length //this starts at 1.
			}
		}
	]
}
var fixation_image = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				if (relevantType == "scene"){
					image = jsPsych.timelineVariable('Face')
				}
				else{
					image = jsPsych.timelineVariable('Scene')
				}
				return `
					<img src="`+image+`" style="height: 255px">
				`
			},
			choices: jsPsych.NO_KEYS,
    		trial_duration: 1200,
		}
	]
}
var irrelevant_fixation_setup = {
	timeline: [fixation_task, fixation_image],
	timeline_variables: randomizedStimuli
}

var face_on_top_task = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				return `
					<div style="position:relative; display: flex; justify-content: center;">
						<img src="`+jsPsych.timelineVariable('Scene')+`" style="position: absolute">
						<br>
						<br>
						<br>
						<br>
						<br>
						<img src="`+jsPsych.timelineVariable('Face')+`" style="position: relative; height: 191px;">
					</div>
				`
			},
			response_type: 'key',
			response_ends_trial: false,
			choices: [' '],
			trial_duration: 1200,
			data: {
				Face: jsPsych.timelineVariable('Face'),
				faceType: jsPsych.timelineVariable('faceType'),
				Scene: jsPsych.timelineVariable('Scene'),
				sceneType: jsPsych.timelineVariable('sceneType'),
				relevant: relevantType,
				frequent: frequentType,
				task: 'faceOnTopCPT'
			},
			on_finish: function(data) {
				if (data.relevant == 'face'){
					if (data.frequent == data.faceType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				else{
					if (data.frequent == data.sceneType){
						data.correct_response = ' '
					}
					else{
						data.correct_response = null
					}
				}
				if (data.response == data.correct_response){
					data.correct = true
				}
				else{
					data.correct = false
				}
				var d = new Date(); 
				data.rtt = d.getTime();
				var priorData = jsPsych.data.get().filter({task: 'faceOnTopCPT'}).values()
				data.trial_number = priorData.length //this starts at 1.
			}
		}
	]
}
var face_on_top_setup = {
	timeline: [face_on_top_task],
	timeline_variables: randomizedStimuli
}


var retrocueIntro = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				if (jsPsych.timelineVariable("orderVariable") == 0){
					image1 = jsPsych.timelineVariable("Scene")
					image2 = jsPsych.timelineVariable("Face")
				}
				else{
					image1 = jsPsych.timelineVariable("Face")
					image2 = jsPsych.timelineVariable("Scene")
				}
				return `
					<div style="display: flex; align-items: center;">						
						<div style="position:relative; display: flex; justify-content: center;">
							<img src="`+image1+`" style="position: absolute; height: 255px;">
							<img src="`+jsPsych.timelineVariable('Scene')+`" style="position: relative;  opacity: 0; filter: grayscale(100%) ">
						</div>
						<p style="font-size: 40px; color: rgb(255, 255, 255)">&#8592;</p>
						<div style="position:relative; display: flex; justify-content: center;">
							<img src="`+image2+`" style="position: absolute; height: 255px;">
							<img src="`+jsPsych.timelineVariable('Scene')+`" style="position: relative;  opacity: 0; filter: grayscale(100%) ">
						</div>
					</div>
				`
			},
			response_type: 'key',
			response_ends_trial: false,
			trial_duration: 500,
		}
	]
}
var retrocueTask = {
	timeline: [
		{
			type: 'html-keyboard-response',
			data: {
				Face: jsPsych.timelineVariable('Face'),
				faceType: jsPsych.timelineVariable('faceType'),
				Scene: jsPsych.timelineVariable('Scene'),
				sceneType: jsPsych.timelineVariable('sceneType'),
				frequentlyRelevant: relevantType,
				frequentClick: frequentType,
				infrequentlyRelevant: irrelevantType,
				infrequentClick: secondFrequentType,
				task: 'retrocueCPT'
			},
			stimulus: function(){
				if (jsPsych.timelineVariable("randomRetrocue") == 0){
					point = irrelevantType
				}
				else{
					point = relevantType
				}
				if (jsPsych.timelineVariable("orderVariable") == 0){
					image1 = jsPsych.timelineVariable("Scene")
					image2 = jsPsych.timelineVariable("Face")
					if (point == 'face'){
						arrowString = "&#8594"
					}
					else{
						arrowString = "&#8592"
					}
				}
				else{
					image1 = jsPsych.timelineVariable("Face")
					image2 = jsPsych.timelineVariable("Scene")
					if (point == 'face'){
						arrowString = "&#8592"
					}
					else{
						arrowString = "&#8594"
					}
				}
				return `
					<div style="display: flex; align-items: center;">						
						<div style="position:relative; display: flex; justify-content: center;">
							<img src="`+image1+`" style="position: absolute; height: 255px;">
							<img src="`+jsPsych.timelineVariable('Scene')+`" style="position: relative;  opacity: 0; filter: grayscale(100%) ">
						</div>
						<p style="font-size: 40px">`+arrowString+`;</p>
						<div style="position:relative; display: flex; justify-content: center;">
							<img src="`+image2+`" style="position: absolute; height: 255px;">
							<img src="`+jsPsych.timelineVariable('Scene')+`" style="position: relative;  opacity: 0; filter: grayscale(100%) ">
						</div>
					</div>
				`
			},
			choices: [' '],
			response_type: 'key',
			response_ends_trial: false,
			trial_duration: 700,
			on_finish: function(data){
				if (jsPsych.timelineVariable("randomRetrocue") == 0){
					point = irrelevantType
				}
				else{
					point = relevantType
				}
				if (jsPsych.timelineVariable("orderVariable") == 0){
					image1 = jsPsych.timelineVariable("Scene")
					image2 = jsPsych.timelineVariable("Face")
					if (point == 'face'){
						data.arrowDirection = "right"
						data.relevantImage = image2
						data.relevantImageType = jsPsych.timelineVariable("faceType")
					}
					else{
						data.arrowDirection = "left"
						data.relevantImage = image1
						data.relevantImageType = jsPsych.timelineVariable("sceneType")
					}
				}
				else{
					image1 = jsPsych.timelineVariable("Face")
					image2 = jsPsych.timelineVariable("Scene")
					if (point == 'face'){
						data.arrowDirection = "left"
						data.relevantImage = image1
						data.relevantImageType = jsPsych.timelineVariable("faceType")
					}
					else{
						data.arrowDirection = "right"
						data.relevantImage = image2
						data.relevantImageType = jsPsych.timelineVariable("sceneType")
					}
				}
			}
		}
	]
}
/*
var retrocue_setup = {
	timeline: [retrocueIntro, retrocueTask],
	timeline_variables: randomizedRetrocueStimuli
}
*/
var mem_instructions = {
	type: 'html-button-response',
	  stimulus:'Great Job! ' +
	  ' The next part of the experiment will be a memory test for the images you saw earlier in the experiment.' +
	  '<br>Note that even though you were presented with many more images of one type than another, for each type of image, half that you will be asked about were presented and half were not.'+
		   '<br> Click the appropriate response for each image, indicating whether you remember seeing it in the previous part of the study.<br>Some of the images will have previously appeared <strong>(old)</strong> and some will have not <strong>(new)</strong>. ' +
			   '<br><br> <strong>1</strong> Definitely new' +
			   '<br> <strong>2</strong> Maybe new' +
			   '<br> <strong>3</strong> Maybe old' +
			   '<br> <strong>4</strong> Definitely old'
			   //+'<br><br>Make sure to use all four responses.'
			   ,
	  choices: ['Continue'],
	  data:{task: 'mem_vis_instructions'},
  }

  var memtest_vis_setup = {
	timeline: [
		{
			type: 'html-keyboard-response',
			stimulus: function(){
				if (jsPsych.timelineVariable('type') == 'indoor' || jsPsych.timelineVariable('type') == 'outdoor'){
					return `<img src="`+jsPsych.timelineVariable('path')+`" style="height: 255px; filter: grayscale(100%); opacity:`+opacity+`">`
				}
				else{
					return `<img src="`+jsPsych.timelineVariable('path')+`" style="height: 255px; filter: grayscale(100%); opacity:`+String(1-opacity)+`">`
				}
			},
			//canvas_height: 700,
			choices: ['1', '2', '3', '4'],
			prompt: [`<br><strong>1</strong> Definitely new`+
					` <br> <strong>2</strong> Maybe new`+
					` <br> <strong>3</strong> Maybe old`+
					` <br> <strong>4</strong> Definitely old`],
			//randomize_order: true,
			data: {
				'task': 'memTest',
				'type': jsPsych.timelineVariable('type'),
				'image': jsPsych.timelineVariable('path'),
				'relevance': jsPsych.timelineVariable('relevance'),
				'frequency': jsPsych.timelineVariable('frequency'),
				'presented': jsPsych.timelineVariable('presented')
			},
			trial_duration: 20000,
			on_finish: function(data){
				if (data.presented){
					data.trial_presented = jsPsych.timelineVariable('trialIndex')
					data.paired_image_frequency = jsPsych.timelineVariable('otherImageFrequency')
				}
				var priorData = jsPsych.data.get().filter({task: 'memTest'}).values()
				data.trial_number = priorData.length //this starts at 1.
				if (data.presented == true){
					data.correct_response = '4'
					if (data.response == data.correct_response){
						data.correct = true
					}
					else{
						data.correct = false
					}
				}
				else{
					data.correct_response = ['1', '2', '3']
					if (data.correct_response.includes(data.response)){
						data.correct = true
					}
					else{
						data.correct = false
					}
				}
			}
		},	
		

	],
  }

  var memtest_vis_response = {
	type: 'html-keyboard-response',
//  function(){console.log('jsPsych.data.getLastTimelineData()', jsPsych.data.getLastTimelineData())},
	stimulus: function(){
		if (jsPsych.timelineVariable('type') == 'indoor' || jsPsych.timelineVariable('type') == 'outdoor'){
			return `<img src="`+jsPsych.timelineVariable('path')+`" style="height: 255px; filter: grayscale(100%); opacity:`+opacity+`">`
		}
		else{
			return `<img src="`+jsPsych.timelineVariable('path')+`" style="height: 255px; filter: grayscale(100%); opacity:`+String(1-opacity)+`">`
		}
	},
	trial_duration: 500,
	prompt: function(){
		// 	// The feedback stimulus is a dynamic parameter because we can't know in advance whether
		// 	// the stimulus should be 'correct' or 'incorrect'.
		// 	// Instead, this function will check the accuracy of the last response and use that information to set
		// 	// the stimulus value on each trial.
			var last_trial = jsPsych.data.get().last(1).values()[0];
			// console.log('last_trial', last_trial.response)
			if(last_trial.response == '1'){
			return [`<br><strong>1 Definitely new</strong>`+
			` <br> <strong>2</strong> Maybe new`+
			` <br> <strong>3</strong> Maybe old`+
			` <br> <strong>4</strong> Definitely old`]; 
			} else if(last_trial.response == '2') {
				return [`<br><strong>1</strong> Definitely new`+
				` <br> <strong>2 Maybe new</strong>`+
				` <br> <strong>3</strong> Maybe old`+
				` <br> <strong>4</strong> Definitely old`];
			} else if(last_trial.response == '3') {
				return [`<br><strong>1</strong> Definitely new`+
				` <br> <strong>2</strong> Maybe new`+
				` <br> <strong>3 Maybe old</strong>`+
				` <br> <strong>4</strong> Definitely old`];
			}
			else if(last_trial.response == '4') {
				return [`<br><strong>1</strong> Definitely new`+
				` <br> <strong>2</strong> Maybe new`+
				` <br> <strong>3</strong> Maybe old`+
				` <br> <strong>4 Definitely old</strong>`];
			}
		},
		data:{task: 'memTest'},
	}
	
	var if_node = {
		timeline: [memtest_vis_response],
		conditional_function: function(){
			if(jsPsych.data.get().filter({task: 'memTest'}).values()[jsPsych.data.get().filter({task: 'memTest'}).values().length-1].rt != null){
				return true;
			} else {
				return false;
			}
		}
	}
	var fixation = {
		type: 'html-keyboard-response',
		stimulus: '<div style="font-size:60px;">+</div>',
		choices: "NO_KEYS",
		trial_duration: 500,
	  };

	var memtest_vis = {
		timeline: [memtest_vis_setup, if_node, fixation],
		timeline_variables: memStimuli
	}

	var cursor_off = {
		type: 'call-function',
		func: function() {
			console.log('does it get called')
			document.body.style.cursor= "none";
		}
	}
	
	var cursor_on = {
		type: 'call-function',	
		func: function() {
			document.body.style.cursor= "auto";
		}
	}

number_of_probe_interruptions = 6
probe_positions = []
while (probe_positions.length < number_of_probe_interruptions){
	position = Math.floor(Math.random()*randomizedStimuli.length)
	if (!probe_positions.includes(position) && position > 25){
		probe_positions.push(position)
	}
}
probe_positions_sorted = probe_positions.sort(function(a, b){return a - b})
probe_positions_sorted.unshift(0)
probe_positions_sorted.push(randomizedStimuli.length-1)
console.log(probe_positions_sorted)
var timeline_order = [preload, timeline_fullscreen, display_consent, demographics1, demographics2, instructions, practice_instructions, practice_loop, get_ready]
for (i = 0; i < probe_positions_sorted.length; i++){
	var overlay_setup = {
		timeline: [overlay_task, fill_in_if_node],
		timeline_variables: randomizedStimuli.slice(probe_positions_sorted[i], probe_positions_sorted[i+1]),
	}
	console.log(randomizedStimuli.slice(probe_positions_sorted[i], probe_positions_sorted[i+1]))
	timeline_order.push(overlay_setup)
	timeline_order.push(call_probes)
}



timeline_order.push(mem_instructions)
timeline_order.push(memtest_vis)
//var timeline_order = [horizontal_setup]
//var timeline_order = [irrelevant_fixation_setup]
//var timeline_order = [face_on_top_setup]
//var timeline_order = [retrocue_setup]
//var timeline_order = [timeline_fullscreen, instructions,  practice_loop, overlay_setup]








jsPsych.init({
	timeline: timeline_order,
	on_interaction_data_update: function(data){
		if(data.event == 'fullscreenexit'){
			if (jsPsych.data.get().exit != null){
				jsPsych.data.addProperties({exit: [newDate]})
			}
			else{
				console.log(jsPsych.data.get())
			}
			console.log(jsPsych.data.get().json())
		}
		
	},
	on_finish: function(){
		jsPsych.data.displayData('csv')
	}
});