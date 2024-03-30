from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin




app= Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": 'http://localhost:3000'}}, supports_credentials=True, origins="http://localhost:3000", methods=['POST', 'OPTIONS'])

@app.route('/route', methods=["POST" , "OPTIONS"])
@cross_origin()
def predict():

    if request.method == 'OPTIONS':
        # Handle CORS preflight request
        response = jsonify({'message': 'CORS request allowed.'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    



    remainingWords= request.json
   




    result_list = []
    guess_list = []

    if remainingWords["returnWords"] == []:
        try:
            with open("wordlist.txt") as f:
                for line in f:
                    guess_list.append(line.strip())
        except FileNotFoundError:
            print("file not found")
    else:
        guess_list = remainingWords["returnWords"]



    for guesses in range(1):
        guess = remainingWords["guess"].lower()
        feedback = remainingWords["feedback"].lower()

        if feedback == "ggggg":
            return {jsonify("completed")}
            break

        temp_tuple = guess_list
        
        j = len(temp_tuple)

        k = 0
        GreenDict = {}
        while (k<5):
            if feedback[k] == "g":
                if GreenDict.get(guess[k]) == None:
                    GreenDict[guess[k]] = 1
                else:
                    GreenDict[guess[k]] = GreenDict[guess[k]] + 1
            k+=1

      
        YellowDict = {}
        n=0
        while (n<5):
            if feedback[n] == "y":
                if YellowDict.get(guess[n]) == None:
                    YellowDict[guess[n]] = 1
                else:
                    YellowDict[guess[n]] = YellowDict[guess[n]] + 1
            n+=1

       
            

        for word in temp_tuple[0:j]:
            

        
            


            for i in range(5):
                

                if feedback[i] == "w" and guess[i] in word:
                    if guess.count(guess[i]) == 1:
                        
                        temp_tuple.remove(word)
                       
                        break
                    else:

                        if guess[i] == word[i]:
                            temp_tuple.remove(word)
                            break
                

                    
                elif feedback[i] == "g" and guess[i] != word[i]:
                   
                    temp_tuple.remove(word)
                    
                    break
                    
                elif feedback[i] == "y" and guess[i] == word[i]:
                   
                    temp_tuple.remove(word)
                   
                    break
                    
                elif feedback[i] == "y":
                    if guess[i] not in word:
                       
                        temp_tuple.remove(word)
                      
                        break
                    elif GreenDict.get(guess[i]) != None:
                        
                        p = 0
                        count = 0
                        while (p<5):
                            if word[p] == guess[i]:
                                count+=1
                            p+=1
                        
                        if count <2:
                            temp_tuple.remove(word)
                            break


                        

        if guess in temp_tuple:
            temp_tuple.remove(guess)

        for word in temp_tuple:
            result_list.append(word)
         
            

    

    

    

    return jsonify(result_list)
    
if __name__ == '__main__':
    app.run(port=8000, debug=True)