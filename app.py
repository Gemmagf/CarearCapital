import streamlit as st
from PIL import Image
import pandas as pd
from datetime import date

#llibraries fin


#grafics
#import plotly
#import matplotlib.pyplot as plt
#from matplotlib.pyplot import figure
#import seaborn as sns


import numpy as np



#import plotly.graph_objects as go
#from plotly.subplots import make_subplots
#import plotly.express as px
#import plotly.figure_factory as ff




#logo = Image.open('logo.png')

#col1, col2, col3 = st.columns([1, 6, 1])
#col2.image(logo,width = 500)




#st.markdown("<h1 style='text-align: center; color: #c2bab0;font-family:Ovo;font-size:300%;'>Career capital Traker</h1>", unsafe_allow_html=True)



#df = pd.read_csv('registres.csv',sep=',')
st.markdown("<h1 style='text-align: center;font-family:Ovo; color: #C874B2;'>Capital de Carrera\n", unsafe_allow_html=True)
st.write("# ")
user_R = 'Gemma'
contra_R = 'Calella'

user = st.text_input("Usuari:") 


if user != "":
     
    if user == user_R :

       
        pwd = st.text_input("Contrasenya:",type="password")
        
        if pwd != "" and pwd != pwd:
            ''' 
            
            La contrasenya és incorrecte sisplau prova de nou. Si no recordes la contrasenya et pots possar en contacte amb nosaltres a través del següent correu: contrasenya@gebydat.cat
            ''' 
        
        elif pwd != "" and pwd == contra_R : 
        
        
            df = pd.read_csv('registres.txt',sep=',')
            if date.today() not in df['Data']: 
                df.loc[0, 'Data'] = date.today() 
            
            #st.table(df)
            
            
            st.markdown("<h2 style='text-align: center;font-family:Ovo; color: #706960;'>Seguiment diai\n", unsafe_allow_html=True)
            st.write("# ")
       
            
            
            st.markdown("<h3 style='text-align: ceter;font-family:Ovo; color: #A9DDDA;'>Rutines personals\n", unsafe_allow_html=True)
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #A9DDDA;'>1. Crema hidratant\n", unsafe_allow_html=True)
            crema = st.radio("",["Si","No"])
            df.loc[0, 'Crema'] = crema
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #A9DDDA;'>2. Minuts d'exercici fisic\n", unsafe_allow_html=True)
            Exercici = st.slider("",0,500)
            df.loc[0, 'Exercici'] = Exercici
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #A9DDDA;'>3. Nombre de cafes\n", unsafe_allow_html=True)
            Cafe = st.slider("",0,10)
            df.loc[0, 'Cafe'] = Cafe
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #A9DDDA;'>4. Hores de son\n", unsafe_allow_html=True)
            Son = st.slider("",0,24)
            df.loc[0, 'Son'] = Son
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #A9DDDA;'>5. Nombre de verdueres/fruites\n", unsafe_allow_html=True)
            Verdures = st.slider("",0,100)
            df.loc[0, 'Verdures'] = Verdures
            
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #A9DDDA;'>6. Dents \n", unsafe_allow_html=True)
            Dents = st.radio("",["Si","No","Més d'un cop"])
            df.loc[0, 'Dents'] = Dents
            
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #A9DDDA;'>7. Dutxa \n", unsafe_allow_html=True)
            Dutxa = st.radio("",["Si","No","Només Cos"])
            df.loc[0, 'Dutxa'] = Dutxa
            
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #A9DDDA;'>8. Diners Gastats \n", unsafe_allow_html=True)
            Diners = st.number_input("",0,50000)
            df.loc[0, 'Diners'] = Diners
            
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #A9DDDA;'>9. En que s'han gastat els diners \n", unsafe_allow_html=True)
            Motiu = st.multiselect("",["Menjar","Lloger","Metge","Viatges (vols,gasolina, menjar,.. fora zurich)", "Visities(amb o sense invitats dins swisa)","Equip","Indexa"])
            
            
            df.loc[0, 'Motiu'] = ' '.join(Motiu)
            
            
            
            
            st.markdown("<h3 style='text-align: ceter;font-family:Ovo; color: #D7A9DD;'>Carear Capital\n", unsafe_allow_html=True)
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #D7A9DD;'>1. Minuts on udemy\n", unsafe_allow_html=True)
            Udemy = st.slider("",0,185)
            df.loc[0, 'Udemy'] = Udemy
            
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #D7A9DD;'>2. Minuts of scientific article lecture\n", unsafe_allow_html=True)
            Articles = st.slider("",0,190)
            df.loc[0, 'Articles'] = Articles
            
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #D7A9DD;'>3. Minuts of codig\n", unsafe_allow_html=True)
            Coding = st.slider("",0,400)
            df.loc[0, 'Coding'] = Coding
            
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #D7A9DD;'>4. Any finished project today?\n", unsafe_allow_html=True)
            Projects = st.slider("",0,15)
            df.loc[0, 'Projects'] = Projects
            
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #D7A9DD;'>5. Minuts of planing, managment or scheduling for future projects \n", unsafe_allow_html=True)
            Planning = st.slider("",0,200)
            df.loc[0, 'Planning'] = Planning
            
            
            st.markdown("<h3 style='text-align: ceter;font-family:Ovo; color: #F8C758;'>Self skills Capital\n", unsafe_allow_html=True)
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #F8C758;'>1. Minuts d'estudi d'aleman\n", unsafe_allow_html=True)
            Aleman = st.slider("",0,90)
            df.loc[0, 'Aleman'] = Aleman
            
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #F8C758;'>2. Nombre de inreraccions en aleman (més de 7 paraules)\n", unsafe_allow_html=True)
            Interaccions = st.slider("",0,50)
            df.loc[0, 'Interaccions'] = Interaccions
            
            st.markdown("<h4 style='text-align: ceter;font-family:Ovo; color: #F8C758;'>3. Nombre de contacte social o laboral rellevant amb Googlers\n", unsafe_allow_html=True)
            Social = st.slider("",0,300)
            df.loc[0, 'Social'] = Social
            
            
            st.write("# ")
            
            
            df.to_csv('registres.txt',sep=',',index=False)
            st.button("Gauardar")
            df.to_csv('registres.txt',sep=',',index=False)
            
            st.markdown("<h2 style='text-align: center;font-family:Ovo; color: #706960;'>Evolució gràfica\n", unsafe_allow_html=True)
            st.write("# ")